package com.roadmap.roadmapservice.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.roadmap.roadmapservice.dao.UserMapper;
import com.roadmap.roadmapservice.dto.UserDto;

//REST 서비스를 제공하기 위한 컨트롤러를 지정하는 어노테이션
@RestController
public class mainController {

	public String result = "";
	
	@Autowired
	private UserMapper uMapper;
	
	//GET 요청을 받기 위한 Mapping 어노테이션(PostMapping, DeleteMapping, PutMapping 이 있음.)
	
	@GetMapping(path = "/test")
	public String[][] test() {
		
		String arr[][] = {{"a1","b1","c1","d1","e1","f1","g1","h1","i1","j1","k1"},{"a2","b1","c1","d1","e1","f1","g1","h1","i1","j1","k1"},{"a3","b1","c1","d1","e1","f1","g1","h1","i1","j1","k1"},
		{"a4","b1","c1","d1","e1","f1","g1","h1","i1","j1","k1"},{"a5","b1","c1","d1","e1","f1","g1","h1","i1","j1","k1"}};
		
		return arr;
	}
	
	// 회원가임
	@GetMapping(path = "/register")
	public Map<String,String> register(@RequestParam String userName, String userId, String userPw, String userAge, String userArea, String userJob, String userInterest, String userEmail, String userPhone, String userSex) {
		
		UserDto user = new UserDto();
		
		if(uMapper.checkUser(userId)==null) {		
			user.setUserName(userName);
			user.setUserId(userId);
			user.setUserPw(userPw);
			user.setUserAge(Integer.parseInt(userAge));
			user.setUserArea(userArea);
			user.setUserJob(userJob);
			user.setUserInterest(userInterest);
			user.setUserEmail(userEmail);
			user.setUserPhone(userPhone);
			user.setUserSex(userSex);
			
			uMapper.insertUser(user);
			
			result = "success";
			return user.information();
		}
		else {
			
			return user.exist();
		}
	}
	
	// 로그인
	@GetMapping(path = "/login")
	public String login(@RequestParam String userId, String userPw) {
		
		System.out.println(uMapper.login(userId, userPw));
		if(uMapper.login(userId, userPw)==null) {
			result = "noExist";
		}
		else {
			result = "success";
		}
		
		return result;
	}

	// 마이페이지 이메일
	@GetMapping(path = "/getemail")
	public String email(@RequestParam String userId) {
		
		result = uMapper.getemail(userId);
		System.out.println(result);
		
		return result;
	}

	// 회원탈퇴
	@GetMapping (path = "/checkout")
	public void checkout(@RequestParam String userId) {
		
		String uid = uMapper.checkUser(userId);
		System.out.println(uid);
		uMapper.deleteUser(userId);
	}
	
	@GetMapping(path = "/checkuserinterest")
	public String checkUserInterest(@RequestParam String userId) {
		
		try {
			
			result = uMapper.checkInterest(userId);
			System.out.println(result);
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	//	@GetMapping(path = "/test")
//	public Map<String, String> test() {
//		Map<String, String> map = new HashMap<>();
//		map.put("result", "Success");
//		return map;
//	}
}
