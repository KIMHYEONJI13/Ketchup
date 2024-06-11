package com.devsplan.ketchup.reserve.repository;

import com.devsplan.ketchup.reserve.entity.Reserve;
import com.devsplan.ketchup.rsc.entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReserveRepository extends JpaRepository<Reserve, Long> {

    List<Reserve> findByResourcesRscCategoryAndRsvStartDttmBetween(String rscCategory, LocalDateTime startDateTime, LocalDateTime endDateTime);

    List<Reserve> findByResources(Resource resources);

    int deleteByRsvNo(int rsvNo);

    @Query("SELECT rsc, rsv FROM Resource rsc " +
            "LEFT JOIN Reserve rsv ON rsc.rscNo = rsv.resources.rscNo " +
            "AND (rsv.rsvStartDttm BETWEEN :startOfDay AND :endOfDay OR rsv.rsvStartDttm IS NULL) " +
            "WHERE rsc.rscCategory = :rscCategory " +
            "AND rsc.rscIsAvailable = true")
    List<Object[]> findResourcesWithOptionalReservationsForDay(@Param("rscCategory") String rscCategory,
                                                               @Param("startOfDay") LocalDateTime startOfDay,
                                                               @Param("endOfDay") LocalDateTime endOfDay);





}
