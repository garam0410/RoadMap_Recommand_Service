package com.roadmap.roadmapinfo.dao;

import java.util.List;

import com.roadmap.roadmapinfo.dto.RoadmapDetailDto;
import com.roadmap.roadmapinfo.dto.RoadmapDto;

public interface UserMapper {
	public List<RoadmapDto> getRoadmapInfo(RoadmapDto roadmapDto);
	
	public List<RoadmapDto> getUserLoveRoadmap(String userId);
	
	public List<RoadmapDto> getUserRoadmap(String userId);
	
	public String getUserId(int uid);

	public List<RoadmapDto> getSearchRoadmap(String query);
	
	public List<RoadmapDetailDto> getRoadmapDetail(RoadmapDetailDto roadmapDetailDto);
}
