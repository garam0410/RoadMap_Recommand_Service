package com.roadmap.roadmapinfo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import com.roadmap.roadmapinfo.dto.RoadmapDetailDto;

public class SetTypeClass {
	
	// 가져온 리스트
	private List<RoadmapDetailDto> list;
	
	//분류된 값들
	ArrayList<String> root = new ArrayList<String>();
	ArrayList<String> r_info = new ArrayList<String>();
	ArrayList<String> trunk = new ArrayList<String>();
	ArrayList<String> t_info = new ArrayList<String>();
	ArrayList<String> branch = new ArrayList<String>();
	ArrayList<String> b_info = new ArrayList<String>();
	ArrayList<String> leaf = new ArrayList<String>();
	
	ArrayList<String> checkBranch = new ArrayList<String>();
	ArrayList<String> checkLeaf = new ArrayList<String>();
	
	//정보 매핑
	Map<String,String> trunkInfo = new HashMap<String,String>();
	Map<String, String> branchInfo = new HashMap<String, String>();
	
	//노드 매핑
//	Map<String,String> trunkBranchNode = new HashMap<String,String>();
//	Map<String,String> branchLeafNode = new HashMap<String,String>();
	
	ArrayList<String> trunkBranchNode = new ArrayList<String>();
	ArrayList<String> branchLeafNode = new ArrayList<String>();
	
	// 결과 반환 변수
	private String result = "[";
	
	// 로드맵 상세 현황 불러오기 (생성자)
	public SetTypeClass(List<RoadmapDetailDto> list) {
		this.list = list;
		addNode();
		addEdge();
	}

	public void addNode() {		
		for (int i = 0; i<list.size(); i++) {
			
			if(!list.get(i).getR_info().equals("")) {
				r_info.add(list.get(i).getR_info());
			}
			
			trunk.add(list.get(i).getTrunk());
			branch.add(list.get(i).getBranch());
			leaf.add(list.get(i).getLeaf());
			
			if(!list.get(i).getT_info().equals("")) {
				trunkInfo.put(list.get(i).getTrunk(), list.get(i).getT_info());
			}
			if(!list.get(i).getB_info().equals("")) {
				branchInfo.put(list.get(i).getBranch(), list.get(i).getB_info());
			}
		}
		//중복 제거
		deleteRepeat();
		
		ArrayList<String> total = new ArrayList<String>();
		
		total.addAll(trunk);
		total.addAll(branch);
		
		result += "{\"data\" : { \"id\" : \"" + list.get(0).getRoot() + "\", \"label\" : \"" + list.get(0).getRoot() + "\", \"info\" : \""+r_info.get(0)+"\"}},";
		for (int i = 0; i<total.size();i++) {
			if(trunkInfo.get(total.get(i)) != null) {
				result += "{\"data\" : { \"id\" : \"" + total.get(i) + "\", \"label\" : \"" + total.get(i) + "\", \"info\" : \""+trunkInfo.get(total.get(i))+"\"}},";
			}
			else if(branchInfo.get(total.get(i)) != null) {
				result += "{\"data\" : { \"id\" : \"" + total.get(i) + "\", \"label\" : \"" + total.get(i) + "\", \"info\" : \""+branchInfo.get(total.get(i))+"\"}},";
			}
			else {
				result += "{\"data\" : { \"id\" : \"" + total.get(i) + "\", \"label\" : \"" + total.get(i) +"\"}},";
			}
		}
		for (int i = 0; i<leaf.size();i++) {
			result += "{\"data\" : { \"id\" : \"" + leaf.get(i) + "\", \"label\" : \"" + leaf.get(i) + "\", \"bookName\" : \""+leaf.get(i)+"\"}},";
		}
	}
	
	public void addEdge() {
		
		int i = 0;
		//trunk 지정
		for (i = 0; i<list.size();i++) {
			
			if(!list.get(i).getR_info().equals("")) {
				r_info.add(list.get(i).getR_info());
			}
			if(!list.get(i).getRoot().equals("")) {
				root.add(list.get(i).getRoot());
			}
				
		}
		deleteRepeat();
		
		i++;
		
		//trunk edge
		for(int j = 0; j<trunk.size();j++) {		
			result += "{\"data\" : { \"id\" : \"" + i + "\", \"source\" : \"" + root.get(0) + "\", \"target\" : \""+ trunk.get(j) +"\"}},";
			i++;
		}
		
		//branch edge
		for(int j = 0; j<trunk.size();j++) {
			
			checkBranch.clear();
			
			for(int k = 0; k<list.size();k++) {
				if(list.get(k).getTrunk().equals(trunk.get(j))) {					
					checkBranch.add(list.get(k).getBranch());
				}
			}
			
			deleteRepeat();
			
			for(int k = 0; k<checkBranch.size();k++) {
				result += "{\"data\" : { \"id\" : \"" + i + "\", \"source\" : \"" + trunk.get(j) + "\", \"target\" : \""+ checkBranch.get(k) +"\"}},";
				i++;
			}
		}
		
		//leaf edge
		for(int j = 0; j<branch.size();j++) {
			
			checkLeaf.clear();
			
			for(int k = 0; k<list.size();k++) {
				if(list.get(k).getBranch().equals(branch.get(j))) {					
					checkLeaf.add(list.get(k).getLeaf());
				}
			}
			
			deleteRepeat();
			
			for(int k = 0; k<checkLeaf.size();k++) {
				result += "{\"data\" : { \"id\" : \"" + i + "\", \"source\" : \"" + branch.get(j) + "\", \"target\" : \""+ checkLeaf.get(k) +"\"}},";
				i++;
			}
		}
	}

	//중복 제거 함수
	public void deleteRepeat() {
		HashSet<String> Htrunk = new HashSet<String>(trunk);
		HashSet<String> Ht_info = new HashSet<String>(t_info);
		HashSet<String> Hbranch = new HashSet<String>(branch);
		HashSet<String> Hb_info = new HashSet<String>(b_info);
		HashSet<String> Hleaf = new HashSet<String>(leaf);
		
		HashSet<String> HcheckBranch = new HashSet<String>(checkBranch);
		HashSet<String> HcheckLeaf = new HashSet<String>(checkLeaf);
		
		trunk = new ArrayList<String>(Htrunk);
		t_info = new ArrayList<String>(Ht_info);
		branch = new ArrayList<String>(Hbranch);
		b_info = new ArrayList<String>(Hb_info);
		leaf = new ArrayList<String>(Hleaf);
		
		checkBranch = new ArrayList<String>(HcheckBranch);
		checkLeaf = new ArrayList<String>(HcheckLeaf);
	}
	
	// 형식 전송
	public String send() {
		result = result.substring(0, result.length()-1);
		result += "]";
		System.out.println(result);
		return result;
	}
}
