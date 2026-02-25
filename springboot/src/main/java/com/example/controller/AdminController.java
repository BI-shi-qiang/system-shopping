package com.example.controller;

import com.example.entity.Admin;
import com.example.common.Result;
import com.example.service.AdminService;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Resource
    private AdminService adminService;

    @PostMapping("/add")
    public Result add(@RequestBody Admin admin) {
        adminService.add(admin);
        return Result.success();
    }

    @PutMapping("/update")
    public Result update(@RequestBody Admin admin) {
        adminService.updateById(admin);
        return Result.success();
    }

    @DeleteMapping("/delete/{id}")
    public Result delete(@PathVariable Integer id) {
        adminService.deleteById(id);
        return Result.success();
    }

    @DeleteMapping("/delete/batch")
    public Result delete(@RequestBody List<Integer> ids) {
        adminService.deleteBatch(ids);
        return Result.success();
    }

    @GetMapping("/selectPage")
    public Result selectPage(Admin admin,
                            @RequestParam(defaultValue = "1") Integer pageNum,
                             @RequestParam(defaultValue = "10") Integer pageSize) {
        PageInfo<Admin> pageInfo =  adminService.selectPage(admin, pageNum, pageSize);
        return Result.success(pageInfo);
    }
}
