package com.taskagile;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class TaskAgileApplicationTests {

  @Autowired
  Environment environment;

  @Test
  public void getProfile_checkContext_ShouldReturnDev() {
    assertThat(environment.getProperty("spring.profiles.active"))
    .isEqualTo("dev");
  }

  @Test
  public void getProfile_checkContext_shouldReturnProd() {
    assertThat(environment.getProperty("spring.profiles.active"))
    .isEqualTo("prod");
  }

	// @Test
	// public void contextLoads() {
	// }

}
