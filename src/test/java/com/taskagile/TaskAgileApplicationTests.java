package com.taskagile;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

// XXX
@SpringBootTest
@ActiveProfiles("test")
class TaskAgileApplicationTests {

  // @Autowired
  // private Environment environment;

  // @Test
  // public void getProfile_checkContext_ShouldReturnDev() {
  //   assertThat(environment.getProperty("spring.profiles.active"))
  //   .isEqualTo("dev");
  // }

  // @Test
  // public void getProfile_checkContext_shouldReturnProd() {
  //   assertThat(environment.getProperty("spring.profiles.active"))
  //   .isEqualTo("prod");
  // }

  @Test
  void contextLoads() {
  }
}
