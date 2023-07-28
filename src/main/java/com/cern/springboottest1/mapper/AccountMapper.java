package com.cern.springboottest1.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cern.springboottest1.cache.MybatisRedisCache;
import com.cern.springboottest1.domain.Account;
import org.apache.ibatis.annotations.CacheNamespace;
import org.apache.ibatis.annotations.Mapper;

@CacheNamespace(implementation = MybatisRedisCache.class)
@Mapper
public interface AccountMapper extends BaseMapper<Account> {

}
