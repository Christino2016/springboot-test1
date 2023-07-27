package com.cern.springboottest1.service;

import com.cern.springboottest1.domain.UserData;
import com.cern.springboottest1.mapper.UserMapper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class AsyncTestService{

    @Async
    public void test() {
        try {
            Thread.sleep(3000);
            System.out.println("异步测试 === This is a AsyncTest!");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}
