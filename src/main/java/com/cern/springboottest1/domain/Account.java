package com.cern.springboottest1.domain;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

@Data
@TableName("t_account")
public class Account implements Serializable  {

    @TableId(type = IdType.AUTO)
    private int id;

    @TableField("year")
    private String year;

    @TableField("username")
    private String username;

    @TableField("password")
    private String password;

    @TableField("role")
    private String role;

    @TableField(value = "updateTime" ,fill = FieldFill.INSERT_UPDATE)
    //后端传给前端的时间格式
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    //前端传给后端的时间格式
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonAlias("updateTime")
    private Date updateTime;

}
