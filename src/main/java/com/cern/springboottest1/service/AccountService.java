package com.cern.springboottest1.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.cern.springboottest1.domain.Account;
import com.cern.springboottest1.util.FilterDescriptor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AccountService extends IService<Account> {

    int addAccount(Account account);

    int updateUser(Account account);

    IPage<Account> searchPage(int pageNo, int pageSize, List<FilterDescriptor> filterList);

}
