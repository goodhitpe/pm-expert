# Day 14: 정보보안 (Information Security)

## 📋 강의 개요

| 항목 | 내용 |
|------|------|
| **과목명** | 정보보안 |
| **교육시간** | 8시간 (오전 4시간 / 오후 4시간) |
| **학습목표** | 정보보안의 기본 개념과 보안 관리 체계를 이해한다 |
| **선수학습** | Day 1-13 |

---

## 🎯 학습 목표

1. 정보보안 3요소(CIA Triad)를 설명할 수 있다
2. 주요 보안 위협과 공격 유형을 식별할 수 있다
3. 보안 관리 체계(ISMS)와 관련 법규를 이해할 수 있다
4. PM 관점에서 프로젝트에 보안 요구사항을 반영할 수 있다

---

## 📚 강의 구성

### 오전 세션 (4시간)

#### 1교시: 정보보안 개요 (1.5시간)
- **정보보안의 정의**: 정보의 수집, 가공, 저장, 전송 과정에서 정보의 훼손, 변조, 유출을 방지하는 활동
- **정보보안 3요소 (CIA Triad)**
  - **기밀성(Confidentiality)**: 인가된 사용자만 정보에 접근
    - 구현: 암호화, 접근 통제, 분류 체계
  - **무결성(Integrity)**: 정보가 비인가된 변경 없이 정확하고 완전
    - 구현: 해시, 디지털 서명, 체크섬
  - **가용성(Availability)**: 인가된 사용자가 필요할 때 정보에 접근 가능
    - 구현: 이중화, 백업, DR(재해복구)
- **추가 보안 속성**
  - 인증(Authentication): 사용자 신원 확인
  - 인가(Authorization): 접근 권한 부여
  - 부인방지(Non-repudiation): 행위 부인 방지
  - 책임추적성(Accountability): 행위자 추적 가능

#### 2교시: 주요 보안 위협 및 공격 유형 (1.5시간)
- **네트워크 공격**
  - DDoS(Distributed Denial of Service): 대량 트래픽으로 서비스 마비
  - 스니핑(Sniffing): 네트워크 패킷 도청
  - 스푸핑(Spoofing): IP/MAC/DNS 위장
  - 중간자 공격(MITM: Man in the Middle)
- **웹 공격 (OWASP Top 10)**
  - SQL 인젝션(SQL Injection): 악의적 SQL 쿼리 삽입
  - XSS(Cross-Site Scripting): 악성 스크립트 삽입
  - CSRF(Cross-Site Request Forgery): 인증된 세션 악용
  - 부적절한 인증/세션 관리
- **악성코드(Malware)**
  - 바이러스(Virus): 다른 프로그램에 기생
  - 웜(Worm): 자가 복제, 네트워크를 통해 전파
  - 트로이 목마(Trojan): 정상 프로그램 위장
  - 랜섬웨어(Ransomware): 데이터 암호화 후 금전 요구
  - 스파이웨어(Spyware): 정보 수집/유출
- **사회공학 공격(Social Engineering)**
  - 피싱(Phishing): 가짜 이메일/사이트로 정보 탈취
  - 스피어 피싱(Spear Phishing): 특정 대상 맞춤형
  - 보이스 피싱(Vishing): 전화를 이용한 사기
  - 테일게이팅(Tailgating): 물리적 보안 우회

#### 3교시: 암호화 및 인증 기술 (1시간)
- **암호화(Encryption) 기본 개념**
  - 평문(Plaintext) → 암호문(Ciphertext)
  - 대칭키 암호화(Symmetric): 동일 키로 암호화/복호화 (AES, DES)
    - 빠름, 키 배포 문제
  - 비대칭키 암호화(Asymmetric): 공개키/개인키 쌍 (RSA, ECC)
    - 느림, 키 배포 용이
  - 해시 함수(Hash): 단방향 변환 (SHA-256, MD5)
    - 무결성 검증, 패스워드 저장
- **PKI(Public Key Infrastructure)**
  - 인증서(Certificate), CA(Certificate Authority)
  - SSL/TLS 통신 과정 (핸드셰이크)
- **인증 기술**
  - 지식 기반: 패스워드, PIN
  - 소유 기반: OTP, 보안카드, 스마트카드
  - 생체 기반: 지문, 홍채, 안면 인식
  - 다중 인증(MFA: Multi-Factor Authentication)

### 오후 세션 (4시간)

#### 4교시: 보안 관리 체계 (1.5시간)
- **ISMS(Information Security Management System)**
  - 정보보호 관리체계 인증
  - ISMS-P (개인정보보호까지 포함)
  - 관리적 / 기술적 / 물리적 보안
- **ISO 27001**
  - 국제 정보보안 관리 표준
  - PDCA 사이클 기반
  - 114개 통제 항목 (14개 도메인)
- **보안 정책(Security Policy)**
  - 정보보안 정책 → 표준 → 지침 → 절차
  - 접근 통제 정책
    - 임의적 접근 통제(DAC)
    - 강제적 접근 통제(MAC)
    - 역할 기반 접근 통제(RBAC)
  - 최소 권한 원칙(Principle of Least Privilege)
  - 직무 분리(Separation of Duties)

#### 5교시: 개인정보보호 및 컴플라이언스 (1.5시간)
- **개인정보보호법 (한국)**
  - 개인정보의 정의 및 유형
  - 수집·이용·제공·파기 원칙
  - 개인정보 처리 동의
  - 개인정보 영향평가(PIA)
  - 정보주체의 권리 (열람, 정정·삭제, 처리정지)
  - 위반 시 과태료/벌금
- **GDPR(General Data Protection Regulation)**
  - EU 일반 개인정보 보호규정
  - 동의 기반, 잊힐 권리, 데이터 이동권
  - 72시간 내 침해 통보 의무
- **금융, 의료 등 산업별 규제**
- **보안 사고 대응 절차(Incident Response)**
  - 준비(Preparation) → 식별(Identification) → 억제(Containment) → 제거(Eradication) → 복구(Recovery) → 교훈(Lessons Learned)
- **BCP(Business Continuity Plan) / DR(Disaster Recovery)**
  - RPO(Recovery Point Objective): 데이터 손실 허용 시점
  - RTO(Recovery Time Objective): 복구 목표 시간

#### 6교시: PM 관점의 보안 및 Q&A (1시간)
- **PM이 보안을 고려해야 하는 장면**
  - 요구사항 분석 시 보안 요구사항 도출
  - 설계 단계에서 보안 아키텍처 검토 (Security by Design)
  - 개발 단계의 시큐어 코딩(Secure Coding) 가이드
  - 테스트 단계의 보안 취약점 점검
  - 운영 단계의 보안 모니터링 및 패치 관리
- **보안 관련 리스크 식별 및 대응**
  - 데이터 유출 리스크
  - 인증/인가 취약점
  - 규제 미준수 리스크
- **Q&A 및 사례 토론**

---

## 📝 핵심 키워드

| 키워드 | 설명 |
|--------|------|
| CIA Triad | 기밀성, 무결성, 가용성 |
| OWASP Top 10 | 주요 웹 보안 위협 목록 |
| ISMS | 정보보호 관리체계 |
| MFA | 다중 인증 (2개 이상 인증 요소 결합) |
| RPO/RTO | 데이터 손실 허용 시점 / 복구 목표 시간 |
| Secure by Design | 설계 단계부터 보안을 반영 |

---

## ✅ 학습 확인 질문

1. CIA Triad의 각 요소를 IT 시스템 사례로 설명하시오.
2. SQL Injection 공격의 원리와 방어 방법을 설명하시오.
3. 대칭키 암호화와 비대칭키 암호화의 차이를 설명하시오.
4. PM이 프로젝트 기획 단계에서 반드시 고려해야 할 보안 요구사항 5가지를 나열하시오.
