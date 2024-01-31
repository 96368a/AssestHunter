package controller

import (
	"github.com/96368a/assets_hunter/app/model"
	"github.com/gin-gonic/gin"
	"net/http"
	"net/http/httputil"
	"net/url"
)

func FofaController(config model.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		remote, err := url.Parse("https://fofa.info/")
		if err != nil {
			panic(err)
		}

		proxy := httputil.NewSingleHostReverseProxy(remote)

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
}
