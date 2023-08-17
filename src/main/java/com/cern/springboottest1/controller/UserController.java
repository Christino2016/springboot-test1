package com.cern.springboottest1.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.cern.springboottest1.domain.Account;
import com.cern.springboottest1.domain.UserData;
import com.cern.springboottest1.mapper.AccountMapper;
import com.cern.springboottest1.mapper.UserMapper;
import com.cern.springboottest1.service.AccountService;
import com.cern.springboottest1.service.AsyncTestService;
import com.cern.springboottest1.util.ComplexPropertyPreFilter;
import com.cern.springboottest1.util.FilterDescriptor;
import com.cern.springboottest1.util.SortDescriptor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.*;

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
        IPage<Account> iPage = accountService.searchPage(2,3, null);
        iPage.getRecords().forEach(System.out::println);
        return "login";
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

    //welcome页面
    @RequestMapping("/welcome-bootstrap")
    public String welcomebootstrap(Model model) {
        System.out.println("welcome-bootstrap页面访问 === ");
        // 通过model向前端模板页面传递数据
        model.addAttribute("currentYear", Calendar.getInstance().get(Calendar.YEAR));
        return "welcome-bootstrap";
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
    //welcome页面
    @RequestMapping("/welcome-kendo")
    public String welcomekendo(Model model) {
        System.out.println("welcome-kendo页面访问 === ");
        // 通过model向前端模板页面传递数据
        model.addAttribute("currentYear", Calendar.getInstance().get(Calendar.YEAR));
        return "welcome-kendo";
    }
    /**
     * 列表结果
     * @param models
     * @return
     */
    @RequestMapping("/account/result")
    @ResponseBody
    public String result(String models){
        try {
            //分页
            int pageNo = 1;
            int pageSize = 10;
            int skip;
            int take;
            if(models==null||models.equals("")){
                //models为空时赋第一页，共1000页的初始值
                models=getVirtualModel();
            }
            JSONObject obj=JSON.parseObject(models);
            if(obj.containsKey("page")){
                pageNo=obj.getIntValue("page");
            }
            if(obj.containsKey("pageSize")){
                pageSize=obj.getIntValue("pageSize");
            }
            if(obj.containsKey("skip")){
                skip=obj.getIntValue("skip");
            }
            if(obj.containsKey("take")){
                take=obj.getIntValue("take");
            }
            //sort
            List<SortDescriptor> sort;
            //filter
            List<FilterDescriptor> filter = new ArrayList<FilterDescriptor>();
            String logic;//最外层逻辑
            if(obj.containsKey("filter")){
                filter=new ArrayList<FilterDescriptor>();
                JSONArray ja=obj.getJSONObject("filter").getJSONArray("filters");
                logic=obj.getJSONObject("filter").getString("logic");
                for (int i = 0; i < ja.size(); i++) {
                    JSONObject jo = (JSONObject) ja.get(i);
                    FilterDescriptor fo=new FilterDescriptor();
                    fo.setField(jo.getString("field"));
                    fo.setValue(jo.getString("value"));
                    if(fo.getValue()!=null&&!fo.getValue().equals(""))
                        filter.add(fo);
                }
            }

            IPage<Account> iPage = accountService.searchPage(pageNo, pageSize, filter);
            List<Account> accountList = iPage.getRecords();
//            QueryWrapper<Account> wrapper = new QueryWrapper();
//            wrapper.like("username", "test");
//            List<Account> accountList = accountMapper.selectList(wrapper);

            Map<Class<?>, Set<String>> excludeMap = new HashMap<Class<?>, Set<String>>();
            Set<String> set = new HashSet<String>();
            set.add("ecotopeDecode");
            set.add("seedCodeList");
            excludeMap.put(Account.class, set);

            ComplexPropertyPreFilter complexPropertycPreFilter = new ComplexPropertyPreFilter(excludeMap);
            String result = JSON.toJSONString(accountList,complexPropertycPreFilter, SerializerFeature.WriteDateUseDateFormat,SerializerFeature.DisableCircularReferenceDetect);
            result = "{\"count\":"+iPage.getTotal()+",\"data\":" + result + "}";
            return result;
//			return kendoPage.getDefaultJsonResult();

        } catch (Exception e) {
            e.printStackTrace();
            log.info("异步获取汇总报告列表异常");
            log.error("异步获取汇总报告列表异常", e);
            return models;
        }
    }
    public String getVirtualModel(){
        JSONObject jo=new JSONObject();
        jo.put("page", 1);
        jo.put("pageSize", 1000);
        return jo.toJSONString();
    }

}
