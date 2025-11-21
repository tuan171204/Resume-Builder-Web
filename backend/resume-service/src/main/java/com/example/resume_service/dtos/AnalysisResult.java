package com.example.resume_service.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class AnalysisResult {
    
    @JsonProperty("score")
    private Double score;
    
    @JsonProperty("rewrites")
    private List<RewriteItem> rewrites;

    // Getters and Setters
    public Double getScore() { return score; }
    public void setScore(Double score) { this.score = score; }
    
    public List<RewriteItem> getRewrites() { return rewrites; }
    public void setRewrites(List<RewriteItem> rewrites) { this.rewrites = rewrites; }
}
