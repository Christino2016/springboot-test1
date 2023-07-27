package com.cern.springboottest1.mapper;

import com.cern.springboottest1.cache.MybatisRedisCache;
import com.cern.springboottest1.domain.UserData;
import org.apache.ibatis.annotations.CacheNamespace;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@CacheNamespace(implementation = MybatisRedisCache.class)
@Mapper
public interface UserMapper {

    @Select("select * from t_s_user where name = #{username}")
    UserData findUserByName(String username);

    @Select("select count(*) from t_s_user")
    String getNum();

}
