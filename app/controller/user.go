package controller

import (
	"github.com/96368a/assets_hunter/app/model"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"net/http"
)

// /api/login
func LoginController(config model.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		var data struct {
			Username string `json:"username" binding:"required"`
			Password string `json:"password" binding:"required"`
		}
		if err := c.ShouldBindJSON(&data); err != nil {
			Fail(c, http.StatusBadRequest, "内部错误")

			return
		}
		if data.Username == config.Username && data.Password == config.Password {
			session := sessions.Default(c)
			session.Set("login", true)
			session.Save()
			Success(c, "登录成功", nil)
			return
		}
		Fail(c, http.StatusUnauthorized, "用户名或密码错误")
	}
}

// /api/checkLogin
func CheckLoginController() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)

		login := session.Get("login")
		if login == nil {
			Fail(c, http.StatusUnauthorized, "未登录")
			return
		}
		Success(c, "已登录", nil)
	}
}

// /api/logout
func LogoutController() gin.HandlerFunc {
	return func(c *gin.Context) {

		session := sessions.Default(c)

		session.Delete("login")
		session.Save()
		Success(c, "已退出登录", nil)
	}
}
