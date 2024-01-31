package model

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
