package com.cern.springboottest1.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.Date;

@Configuration
public class SchedulingConfiguration {

    //@Scheduled(fixedRate = 5000)
    @Scheduled(cron = "*/1500 * * * * ?")
    public void test() {
        System.out.println("定时任务 === This is Scheduling 150s Task - " + new Date());
    }


}
