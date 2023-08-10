package com.cern.springboottest1.controller;

import com.cern.springboottest1.domain.Account;
import com.cern.springboottest1.mapper.AccountMapper;
import com.cern.springboottest1.service.AccountService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("api")
public class UserRestController {

    @Resource
    AccountService accountService;

    @Resource
    AccountMapper accountMapper;

    //http://localhost:8080/api/accounts get
    @GetMapping("accounts")
    public List<Account> getAllAccount() {
        return accountMapper.selectList(null);
    }

    //http://localhost:8080/api/accounts/0 get
    @GetMapping("accounts/{id}")
    public Account queryById(@PathVariable("id") Integer account_id) {
        return accountMapper.selectById(account_id);
    }


}
