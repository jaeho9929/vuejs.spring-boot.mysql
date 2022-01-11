package com.taskagile.domain.application;

import com.taskagile.domain.application.commands.RegistrationCommand;
import com.taskagile.domain.model.user.RegistrationException;

/*
- 모델의 작업 조정
- 보안 제약사항 (security constraints로 도메인 모델 보호)
- 트랜잭션 컨트롤
*/
public interface UserService {
  void register(RegistrationCommand command) throws RegistrationException;
}
