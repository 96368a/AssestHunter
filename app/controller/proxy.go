package controller

import (
	"context"
	"github.com/96368a/assets_hunter/app/model"
	"github.com/gin-gonic/gin"
	"log/slog"
	"net/http"
	"net/http/httputil"
	"net/url"
	"time"
)

func FofaController(config model.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		remote, err := url.Parse("https://fofa.info/")
		if err != nil {
			return
		}

		// 创建一个自定义的Transport
		transport := &http.Transport{
			// 设置最大空闲连接
			MaxIdleConns: 100,
			// 设置空闲连接的超时时间
			IdleConnTimeout: 90 * time.Second,
			// 其他Transport配置
		}

		proxy := httputil.NewSingleHostReverseProxy(remote)
		proxy.Transport = transport
		proxy.Director = func(req *http.Request) {
			c.Request.Header.Del("Origin")
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

		// 设置超时上下文
		ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
		defer cancel()

		// 将超时上下文应用到请求中
		reqWithContext := c.Request.WithContext(ctx)

		// 设置自定义的错误处理器
		proxy.ErrorHandler = func(w http.ResponseWriter, r *http.Request, err error) {
			// 在这里处理错误，比如记录错误或者返回特定的HTTP响应
			slog.Error("Proxy error", "error", err)
			http.Error(w, "Bad Gateway", http.StatusBadGateway)
		}

		c.Writer.Header().Set("X-FLAG", "flag{xxx-xxx}")
		c.Writer.Header().Set("X-Forwarded-For", c.ClientIP())
		c.Writer.Header().Del("Access-Control-Allow-Credentials")
		c.Writer.Header().Del("Access-Control-Allow-Origin")
		proxy.ServeHTTP(c.Writer, reqWithContext)
	}
}
