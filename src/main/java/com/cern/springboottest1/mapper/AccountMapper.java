package com.cern.springboottest1.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cern.springboottest1.domain.Account;
import org.apache.ibatis.annotations.CacheNamespace;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@CacheNamespace(flushInterval = 60000)
@Mapper
public interface AccountMapper extends BaseMapper<Account> {

    @Select("select * from t_account where username = #{username}")
    List<Account> findByUsername(@Param("username") String username);


}
