package com.cern.springboottest1.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.cern.springboottest1.domain.Account;
import com.cern.springboottest1.mapper.AccountMapper;
import com.cern.springboottest1.util.FilterDescriptor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

@Service
@Transactional
public class AccountServiceImpl implements AccountService {

    @Resource
    AccountMapper accountMapper;

    @Override
    public int addAccount(Account account) {
        System.out.println("IbatisPlus测试 === 添加用户");
        return accountMapper.insert(account);
    }

    @Override
    public int updateUser(Account account) {
        return accountMapper.updateById(account);
    }

    @Override
    public IPage<Account> searchPage(int pageNo, int pageSize, List<FilterDescriptor> filterList) {
        QueryWrapper<Account> wrapper = new QueryWrapper<Account>();
        for(FilterDescriptor filter : filterList) {
            wrapper.like(filter.getField(), filter.getValue());
        }
//        Page<Account> page = new Page<Account>();
//        page.setCurrent(pageNo);
//        page.setSize(pageSize);
        Page<Account> page = Page.of(pageNo, pageSize);
        return accountMapper.selectPage(page, wrapper);
    }

    @Override
    public boolean saveBatch(Collection<Account> entityList, int batchSize) {
        return false;
    }

    @Override
    public boolean saveOrUpdateBatch(Collection<Account> entityList, int batchSize) {
        return false;
    }

    @Override
    public boolean updateBatchById(Collection<Account> entityList, int batchSize) {
        return false;
    }

    @Override
    public boolean saveOrUpdate(Account entity) {
        return false;
    }

    @Override
    public Account getOne(Wrapper<Account> queryWrapper, boolean throwEx) {
        return null;
    }

    @Override
    public Map<String, Object> getMap(Wrapper<Account> queryWrapper) {
        return null;
    }

    @Override
    public <V> V getObj(Wrapper<Account> queryWrapper, Function<? super Object, V> mapper) {
        return null;
    }

    @Override
    public BaseMapper<Account> getBaseMapper() {
        return null;
    }

    @Override
    public Class<Account> getEntityClass() {
        return null;
    }
}
