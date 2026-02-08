package com.example.mapper;

import com.example.entity.Admin;
import org.apache.ibatis.annotations.Select;

public interface AdminMapper {

    int insert(Admin admin);

    @Select("select * from `admin` where username = #{username}")
    Admin selectByUsername(String username);
}
