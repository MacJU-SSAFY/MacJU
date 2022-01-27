package com.sib.macju.domain.member;


import com.sib.macju.domain.hashtag.AromaHashTag;
import com.sib.macju.domain.member.MemberRateBeer;
import lombok.Data;

import javax.persistence.*;


@Entity
@Data
@Table(name = "rate_has_aroma_hash_tag")
public class RateHasAromaHashTag {

    @Id
    @Column(name = "rate_has_aroma_hash_tag_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long rateHasAromaHashTagId;

    @ManyToOne
    @JoinColumn(name = "member_rate_beer_id")
    private MemberRateBeer memberRateBeer;

    @ManyToOne
    @JoinColumn(name = "aroma_hash_tag_id")
    private AromaHashTag aromaHashTag;

}
