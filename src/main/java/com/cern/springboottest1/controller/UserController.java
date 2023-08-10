package com.cern.springboottest1.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.cern.springboottest1.domain.Account;
import com.cern.springboottest1.domain.UserData;
import com.cern.springboottest1.mapper.AccountMapper;
import com.cern.springboottest1.mapper.UserMapper;
import com.cern.springboottest1.service.AccountService;
import com.cern.springboottest1.service.AsyncTestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Slf4j
@Controller
public class UserController {

    //value可读取配置文件中的变量
    @Value("${property.property1}")
    String property;

    @Resource
    AsyncTestService asyncTestService;

    @Resource
    UserMapper userMapper;

    @Resource
    AccountMapper accountMapper;

    @Resource
    AccountService accountService;

    //index页面
    @RequestMapping("/login")
    public String login(HttpServletRequest request) {
        log.info("登录日志 === Someone is logging to the system!!!");

        //测试异步操作
//        asyncTestService.test();
//        System.out.println("同步测试 === This is a Sync test!");

        //测试Redis cache
        System.out.println("Redis Cache测试 === database count:" + userMapper.getNum());

        //测试Mybatics plus
        List<Account> accountList = accountMapper.findByUsername("cern");
        if (accountList.size() > 0) {
            Account account = accountList.get(0);
            System.out.println("Mybatis-plus测试 === username:" + account.getUsername() + "$" + account.getPassword());
        }
        double rand = Math.random();
        Account account = new Account();
        account.setYear("2023");
        account.setUsername("testMan" + rand);
        account.setPassword("123456");
        account.setRole("admin");
        account.setUpdateTime(new Date());
        accountService.addAccount(account);

        //测试Mybatics plus page分页
        IPage<Account> iPage = accountService.searchPage(2,3);
        iPage.getRecords().forEach(System.out::println);
        return "login";
    }

    //welcome页面
    @RequestMapping("/welcome-bootstrap")
    public String welcomebootstrap(Model model) {
        System.out.println("welcome-bootstrap页面访问 === ");
        // 通过model向前端模板页面传递数据
        model.addAttribute("currentYear", Calendar.getInstance().get(Calendar.YEAR));
        return "welcome-bootstrap";
    }
    //welcome页面
    @RequestMapping("/welcome-adminlte")
    public String welcomeadminlte(Model model) {
        System.out.println("welcome-adminlte页面访问 === ");
        // 通过model向前端模板页面传递数据
        model.addAttribute("currentYear", Calendar.getInstance().get(Calendar.YEAR));
        return "welcome-adminlte";
    }

    //welcome页面提交post
    @PostMapping("/doWelcome")
    public String doWelcome(HttpServletRequest request, Model model) {
        System.out.println("doWelcome访问 === ");
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        if (username.equals("admin") && password.equals("admin")) {
            return "index";
        } else {
            return "error";
        }
    }

    //index页面
    @RequestMapping("/index")
    public String index() {
        System.out.println("Index页面访问 === ");
        return "index";
    }

    @RequestMapping("/login-error")
    public String error() {
        return "error";
    }

    @RequestMapping("/user")
    @ResponseBody
    public UserData user() {
        UserData user = new UserData();
        //user.setId(10);
        user.setName("小明");
        user.setPassword("123456");
        //user.setRole("admin");
        return user;
    }



}
