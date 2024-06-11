//package com.devsplan.ketchup.schedule;
//
//import com.devsplan.ketchup.schedule.controller.SubscriptionController;
//import com.devsplan.ketchup.schedule.entity.Subscription;
//import com.devsplan.ketchup.schedule.service.SubscriptionService;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//
//import java.util.Collections;
//
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//@WebMvcTest(SubscriptionController.class)
//
//public class SubscriptionControllerTest {
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private SubscriptionService subscriptionService;
//
//    @Test
//    void testGetAllSubscriptions() throws Exception {
//        Subscription subscription = Subscription.builder().memberNo(3).build();
//        Mockito.when(subscriptionService.getAllSubscriptions()).thenReturn(Collections.singletonList(subscription));
//
//        mockMvc.perform(get("/subscriptions"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$[0].memberNo").value(3));
//    }
//
//    @Test
//    void testSubscribeUser() throws Exception {
//        Subscription subscription = Subscription.builder().memberNo(3).build();
//        Mockito.when(subscriptionService.subscribeUser(3)).thenReturn(subscription);
//
//        mockMvc.perform(post("/subscriptions")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content("{\"memberNo\": 3}"))
//                .andExpect(status().isCreated())
//                .andExpect(jsonPath("$.memberNo").value(3));
//    }
//
//    @Test
//    void testUnsubscribeUser() throws Exception {
//        mockMvc.perform(delete("/subscriptions/3"))
//                .andExpect(status().isNoContent());
//    }
//
//}
