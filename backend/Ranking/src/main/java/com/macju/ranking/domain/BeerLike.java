package com.macju.ranking.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@Data
@RedisHash(value="beerlike")//, timeToLive = 86400) // 1일간 유지
public class BeerLike {

    @Id
    private Long Id;
    @Indexed
    private Long beerId;
    @Indexed
    private Long memberId;

}
