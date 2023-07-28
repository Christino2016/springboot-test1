package com.cern.springboottest1.domain;

import lombok.Data;

import java.io.Serializable;

@Data
public class UserData implements Serializable {
    String id;
    String name;
    String password;
    String recorder;
}