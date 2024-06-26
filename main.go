package main

import (
	"errors"
	"flag"
	"github.com/96368a/assets_hunter/app/controller"
	"github.com/96368a/assets_hunter/app/model"
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/spf13/viper"
	"gopkg.in/yaml.v3"
	"log"
	"net/http"
	"os"
)

var config model.Config
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

func InitConfig() error {
	viper.SetConfigName("config")
	viper.AddConfigPath(".")
	//viper.SetConfigType("toml")
	err := viper.ReadInConfig()
	if err != nil {
		var configFileNotFoundError viper.ConfigFileNotFoundError
		if errors.As(err, &configFileNotFoundError) {
			config.Username = "admin"
			config.Password = "admin"
			marshal, err := yaml.Marshal(config)
			if err != nil {
				return errors.New("创建配置文件失败")
			}
			log.Println("配置文件不存在，已创建空白配置文件")
			os.WriteFile("./config.yaml", marshal, 0644)
			return nil
		}
		log.Fatal("read config failed: %v", err)
		return err
	}
	err = viper.Unmarshal(&config)
	if err != nil {
		return err
	}
	log.Printf("%v", config)
	return nil
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
	r.GET("/fofa/api/v1/*proxyPath", AuthMiddleware(), controller.FofaController(config))
	r.POST("/api/login", controller.LoginController(config))
	r.GET("/api/checkLogin", controller.CheckLoginController())
	r.GET("/api/logout", controller.LogoutController())
	r.Run(":8080")
}
