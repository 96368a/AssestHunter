package main

import (
	"flag"
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/spf13/viper"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
)

type Config struct {
	Username string
	Password string
	Fofa     FofaConfig
	Quake    QuakeConfig
	Hunter   HunterConfig
}

type FofaConfig struct {
	Email string
	Key   string
}

type QuakeConfig struct {
	Email string
	Key   string
}

type HunterConfig struct {
	Email string
	Key   string
}

var config Config
var isDebugMode bool

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)
		login := session.Get("login")
		if login == nil {
			c.JSON(http.StatusUnauthorized, gin.H{"status": "unauthorized"})
			c.Abort()
			return
		}
		c.Next()

	}
}

func proxy(c *gin.Context) {
	remote, err := url.Parse("https://fofa.info/")
	if err != nil {
		panic(err)
	}

	proxy := httputil.NewSingleHostReverseProxy(remote)
	//Define the director func
	//This is a good place to log, for example
	proxy.Director = func(req *http.Request) {
		req.Header = c.Request.Header
		req.Host = remote.Host
		req.URL.Scheme = remote.Scheme
		req.URL.Host = remote.Host
		req.URL.Path = "/api/v1" + c.Param("proxyPath")
		req.URL.RawQuery = c.Request.URL.RawQuery
		fofaKey, _ := c.GetQuery("key")
		if config.Fofa.Key != "" && fofaKey == "" {
			req.URL.RawQuery = req.URL.RawQuery + "&email=" + config.Fofa.Email + "&key=" + config.Fofa.Key
		}
	}
	c.Writer.Header().Set("X-FLAG", "flag{xxx-xxx}")
	c.Writer.Header().Set("X-Forwarded-For", c.ClientIP())
	proxy.ServeHTTP(c.Writer, c.Request)
}

func InitConfig() {
	viper.SetConfigName("config")
	viper.AddConfigPath(".")
	//viper.SetConfigType("toml")
	err := viper.ReadInConfig()
	if err != nil {
		log.Fatal("read config failed: %v", err)
	}
	viper.Unmarshal(&config)
	log.Printf("%v", config)
	//fmt.Println("protocols: ", viper.GetStringSlice("server.protocols"))
	//fmt.Println("ports: ", viper.GetStringSlice("fofa.email"))
	//fmt.Println("timeout: ", viper.GetStringSlice("server.timeout"))
}

func main() {
	InitConfig()
	// 通过环境变量设置调试模式
	if os.Getenv("DEBUG_MODE") == "true" {
		isDebugMode = true
	}

	// 或者通过命令行参数设置调试模式
	flag.BoolVar(&isDebugMode, "debug", false, "Enable debug mode")

	// 解析命令行参数
	flag.Parse()

	r := gin.Default()
	store := cookie.NewStore([]byte(uuid.NewString()))
	r.Use(sessions.Sessions("JSESSIONID", store))
	// 添加中间件处理跨域请求
	if isDebugMode {
		log.Printf("调试模式跨域已启动")
		r.Use(cors.New(cors.Config{
			AllowOrigins:     []string{"http://localhost:3000"},
			AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
			AllowHeaders:     []string{"Origin", "Content-Type", "Content-Length"},
			AllowCredentials: true,
		}))
	}
	//Create a catchall route
	r.Any("/fofa/api/v1/*proxyPath", AuthMiddleware(), proxy)
	r.POST("/api/login", func(c *gin.Context) {
		username := c.DefaultPostForm("username", "")
		password := c.DefaultPostForm("password", "")
		if username == config.Username && password == config.Password {
			session := sessions.Default(c)
			session.Set("login", true)
			session.Save()
			c.JSON(http.StatusOK, gin.H{"message": "登录成功"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "登录失败"})
	})
	r.Run(":8080")
}
