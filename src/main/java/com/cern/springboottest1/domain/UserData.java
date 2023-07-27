package com.cern.springboottest1.domain;

import lombok.Data;

@Data
public class UserData {
    String id;
    String name;
    String password;
    String recorder;
}