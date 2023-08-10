package com.cern.springboottest1.config;

import com.cern.springboottest1.cache.RedisTokenRepository;
import com.cern.springboottest1.service.UserAuthService;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.annotation.Resource;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Resource
    UserAuthService service;

    @Resource
    RedisTokenRepository repository;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // 这里为了测试方便暂时先禁用csrf
        //http.csrf().disable();
        http.csrf().ignoringAntMatchers("/druid/*");
        http
                .authorizeHttpRequests()
                //允许这些路径不用验证
                .antMatchers("/static/**").permitAll()
                // 拥有其中一项权限即可，"USER"权限与UserDetails的Authorities中"USER"匹配
                // .antMatchers("/api/user/**").hasAnyAuthority("USER", "ADMIN")
                //这些路径需要admin角色的权限
                //.anyRequest().hasRole("admin")
                //其余的路径都需要登录
//                .anyRequest().authenticated()
                .and()
                .formLogin()
                // 登录页面地址（也即判断请求未登录验证时，重定向到的页面）
                .loginPage("/login")
                // 登录接口路径
                .loginProcessingUrl("/doLogin")
                .permitAll()
                // 登录成功后重定向到的页面地址
                .defaultSuccessUrl("/index", true)
                // 登录失败时重定向到的页面
                .failureUrl("/login-error")
                // 登录接口传递用户名的参数名
                .usernameParameter("username")
                // 登录接口传递密码的参数名
                .passwordParameter("password")
                .and()
                .rememberMe()
                //.rememberMeParameter(Remember_)
                .tokenRepository(repository)

                ;

    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                // 设置自定义获取用户信息的业务类
                .userDetailsService(service)
                .passwordEncoder(new BCryptPasswordEncoder());
    }



}
