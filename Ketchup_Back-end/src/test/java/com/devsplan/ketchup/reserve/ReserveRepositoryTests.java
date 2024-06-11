package com.devsplan.ketchup.reserve;

import com.devsplan.ketchup.reserve.repository.ReserveRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@SpringBootTest
public class ReserveRepositoryTests {

    @Autowired
    private ReserveRepository reserveRepository;

    @Test
    public void testFindResourcesWithOptionalReservationsForDay() {
        List<Object[]> result = reserveRepository.findResourcesWithOptionalReservationsForDay("회의실", LocalDateTime.of(2024, 5, 10, 0, 0), LocalDateTime.of(2024, 5, 10, 23, 59));

        for (Object[] arr : result) {
            System.out.println("arr = " + Arrays.toString(arr));
        }
        System.out.println("result size" + result.size());
    }
}
