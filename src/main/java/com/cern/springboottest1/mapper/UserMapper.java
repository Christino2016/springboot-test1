package com.cern.springboottest1.mapper;

import com.cern.springboottest1.domain.UserData;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {

    @Select("select * from t_s_user where name = #{username}")
    UserData findUserByName(String username);

}