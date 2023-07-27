package com.cern.springboottest1.service;

import com.cern.springboottest1.domain.UserData;
import com.cern.springboottest1.mapper.UserMapper;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class UserAuthService implements UserDetailsService {

    @Resource
    UserMapper mapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            UserData data = mapper.findUserByName(username);
            if(data == null) throw new UsernameNotFoundException("用户"+username+"登录失败，用户名不存在!");
            return User
                    .withUsername(data.getName())
                    .password(data.getPassword())
                    .roles(data.getRecorder())
                    .build();
    }


}
