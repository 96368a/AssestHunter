package main

import (
	"github.com/spf13/viper"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"

	"github.com/gin-gonic/gin"
)

type Config struct {
	Fofa   FofaConfig
	Quake  QuakeConfig
	Hunter HunterConfig
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
	r := gin.Default()

	//Create a catchall route
	r.Any("/fofa/api/v1/*proxyPath", proxy)

	r.Run(":8080")
}
