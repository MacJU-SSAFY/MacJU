package com.macju.ranking.repository;

import com.macju.ranking.domain.PostLike;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostLikeRedisRepository extends CrudRepository<PostLike, Long> {
    public PostLike findByPostIdAndMemberId(Long postId, Long memberId);
    public void deleteByPostIdAndMemberId(Long postId, Long memberId);

}
