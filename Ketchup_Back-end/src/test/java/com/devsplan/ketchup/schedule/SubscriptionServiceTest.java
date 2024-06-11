//package com.devsplan.ketchup.schedule;
//
//import com.devsplan.ketchup.schedule.entity.Subscription;
//import com.devsplan.ketchup.schedule.repository.SubscriptionRepository;
//import com.devsplan.ketchup.schedule.service.SubscriptionService;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//
//import java.util.Arrays;
//import java.util.List;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//public class SubscriptionServiceTest {
//
//    @Mock
//    private SubscriptionRepository subscriptionRepository;
//
//    @InjectMocks
//    private SubscriptionService subscriptionService;
//
//    public SubscriptionServiceTest() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    void testGetAllSubscriptions() {
//        Subscription subscription = Subscription.builder().memberNo(3).build();
//        when(subscriptionRepository.findAll()).thenReturn(Arrays.asList(subscription));
//
//        List<Subscription> subscriptions = subscriptionService.getAllSubscriptions();
//        assertEquals(1, subscriptions.size());
//        assertEquals(3, subscriptions.get(0).getMemberNo());
//    }
//
//    @Test
//    void testSubscribeUser() {
//        Subscription subscription = Subscription.builder().memberNo(3).build();
//        when(subscriptionRepository.save(any(Subscription.class))).thenReturn(subscription);
//
//        Subscription createdSubscription = subscriptionService.subscribeUser(3);
//        assertNotNull(createdSubscription);
//        assertEquals(3, createdSubscription.getMemberNo());
//    }
//
//    @Test
//    void testUnsubscribeUser() {
//        doNothing().when(subscriptionRepository).deleteById(1L);
//
//        assertDoesNotThrow(() -> subscriptionService.unsubscribeUser(3));
//        verify(subscriptionRepository, times(1)).deleteById(3L);
//    }
//}
