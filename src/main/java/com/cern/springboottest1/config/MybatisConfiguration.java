package com.cern.springboottest1.config;

import com.cern.springboottest1.cache.MybatisRedisCache;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.util.Date;

@Configuration
public class MybatisConfiguration {

    @Resource
    RedisTemplate<Object, Object> redisTemplate;

    @PostConstruct
    public void init() {
        MybatisRedisCache.setTemplate(redisTemplate);
    }

}
