# Day 13 네트워크 — 강의 보고서

## 강의 개요
- **날짜**: Day 13
- **주제**: 네트워크 & IT 인프라
- **슬라이드 수**: 17장
- **소스 파일**: `summaries/day13-network.md`

---

## 소스 대비 커버리지

### ✅ 포함된 내용

| 항목 | 슬라이드 | 처리 방식 |
|------|---------|-----------|
| 네트워크 정의 및 분류 5종 (LAN/WAN/MAN/WLAN/VPN) | #5 | 5행 비교표 |
| 네트워크 토폴로지 4종 (스타/버스/링/메시) | #5 | 4행 비교표 + PM 활용 포인트 |
| OSI 7계층 이름·기능·비유 | #7 | 7행 표 (계층별 비유 포함) |
| 데이터 캡슐화 흐름 | #7 | warning info-box |
| OSI 암기법 (영문 + 한글) | #7 | gold info-box |
| TCP/IP 4계층 매핑 | #9 | comparison + 표 |
| TCP vs UDP 비교 | #9 | comparison (좌=TCP / 우=UDP) |
| IPv4 vs IPv6 비교 + 사설 IP 대역 + NAT | #9 | info-box |
| Well-Known 포트 6개 (21/22/25/53/80/443) | #9 | 6행 표 |
| DNS 정의·계층·레코드 5종 | #10 | info-box |
| HTTP 메서드 5종 (GET/POST/PUT/PATCH/DELETE) | #10 | 5행 표 |
| HTTP 상태 코드 분류 (2xx~5xx) | #10 | warning info-box |
| REST API PM 관점 중요성 | #10 | gold info-box |
| 네트워크 장비 5종 (Hub/Switch/Router/Firewall/LB) | #12 | 5행 표 (OSI 계층 포함) |
| 클라우드 서비스 3계층 (IaaS/PaaS/SaaS) | #12 | 3단계 step diagram |
| 온프레미스 vs 클라우드 비교 | #12 | gold info-box |
| 방화벽·DMZ·IDS·IPS·SSL/TLS | #14 | 5행 표 |
| 주요 공격 유형 4종 (DDoS/MITM/ARP스푸핑/DNS하이재킹) | #14 | warning info-box |
| PM 네트워크 지식 활용 장면 5가지 | #14 | gold info-box (Day09/Day10 연계 포함) |
| 핵심 키워드 21개 | #15 | keyword-tags |
| 확인 퀴즈 4문항 + 모범 답안 | #16 | quiz-box + details/summary |

---

## ✅ 보완 자료로 해결된 항목

| 항목 | 사유 |
|------|------|
| DNS 질의 과정 (Recursive/Iterative) 상세 | ✅ 보완 자료 B-2 (재귀·반복 질의 흐름·차이점 완성) |
| TCP 3-Way Handshake 단계별 상세 (SYN/SYN-ACK/ACK) | ✅ 보완 자료 B-1 (3단계 흐름도·4-Way Handshake 포함 완성) |
| 서브넷 마스크 계산 방법 | ✅ 보완 자료 B-3 (CIDR 표기·호스트 수 공식·용도 완성) |
| SNMP, NetFlow 모니터링 도구 상세 | 성능 지표 개념 언급만 포함 |
| 퍼블릭/프라이빗/하이브리드/멀티 클라우드 상세 | 클라우드 분류 info-box에 briefly 언급 |
| RESTful 6개 아키텍처 원칙 상세 | PM 관점에서 HTTP 메서드 이해로 충분 |
| DNS TXT 레코드 (SPF/DKIM) 상세 | 고급 이메일 보안 영역 |

---

## 시험 포인트 (PMP/자격증 관련)

### 🔴 고빈도 출제 항목

1. **OSI 7계층 순서**
   - 물리(1) → 데이터링크(2) → 네트워크(3) → 전송(4) → 세션(5) → 표현(6) → 응용(7)
   - 암기: "물데네전세표응"

2. **TCP vs UDP**
   - TCP = 신뢰성·순서·재전송 (은행·이메일)
   - UDP = 빠른 속도·실시간 (스트리밍·DNS·게임)

3. **IDS vs IPS**
   - IDS = 탐지만 (경보 발송, 직접 차단 불가)
   - IPS = 탐지 + 자동 차단 (더 적극적)

4. **클라우드 비용 모델**
   - 온프레미스 = CAPEX (자본 지출, 초기 투자)
   - 클라우드 = OPEX (운영 지출, 사용량 기반)

5. **IaaS/PaaS/SaaS 구분**
   - IaaS: 서버/스토리지 (AWS EC2)
   - PaaS: 개발 플랫폼 (Heroku)
   - SaaS: 완성 SW (Gmail, Slack)

6. **포트 번호 매핑**
   - 80=HTTP, 443=HTTPS, 22=SSH, 21=FTP, 25=SMTP, 53=DNS

---

## SVG / 다이어그램 목록

| SVG | 위치 | 설명 |
|-----|------|------|
| (없음 — 태이블과 diagram 클래스로 처리) | - | OSI 표, TCP비교, 클라우드 계층 diagram |

---

## 연결 관계

- **Day 06 (품질)**: NFR = 응답시간·가용성 → 네트워크 SLA 정의의 기반
- **Day 09 (리스크)**: 네트워크 단절·DDoS = 리스크 등록부 항목
- **Day 10 (조달)**: 클라우드 vs 온프레미스 = Make or Buy 결정, RFP에 방화벽·DMZ 명시
- **Day 12 (SW공학)**: HTTP API = 시스템 간 연동, CI/CD 파이프라인의 배포 대상
- **Day 14 (보안)**: DMZ·IDS/IPS가 내일 Day14 정보보안의 직접적 선수 지식

---

*생성일: Day 13 | Draft004*


---

## 보완 자료 (슬라이드 미포함 핵심 내용)

### B-1. TCP 3-Way Handshake — 연결 수립 과정

```
클라이언트                    서버
   |  ----[SYN, seq=x]---->  |   1. 연결 요청
   |  <--[SYN-ACK, seq=y,    |   2. 승인 + 서버 시퀀스
   |      ack=x+1]----        |
   |  ----[ACK, ack=y+1]--->  |   3. 최종 확인 → 연결 완료
```

| 단계 | 패킷 | 의미 |
|------|------|------|
| 1 | SYN | 클라이언트 연결 요청 (seq=x) |
| 2 | SYN-ACK | 서버 승인 + 서버 자신의 시퀀스 제시 |
| 3 | ACK | 클라이언트 최종 확인 → Full-Duplex 통신 시작 |

> **4-Way Handshake (연결 종료)**: FIN → ACK → FIN → ACK (TIME_WAIT 상태 중요)

---

### B-2. DNS 질의 과정 — 재귀 vs 반복

**재귀(Recursive) 질의**:
```
클라이언트 → 로컬 DNS → Root NS → TLD NS → 권위 DNS
모든 응답이 로컬 DNS를 통해 클라이언트에 반환됨
```

**반복(Iterative) 질의**:
```
로컬 DNS가 직접 Root NS → TLD NS → 권위 DNS에 순차 요청
클라이언트는 로컬 DNS에만 요청하고 기다림
```

| 구분 | 재귀 | 반복 |
|------|------|------|
| 부담 | 로컬 DNS에 집중 | 로컬 DNS가 계속 조회 |
| 실제 사용 | 클라이언트↔로컬 DNS | 로컬 DNS↔상위 DNS |
| 캐싱 | 로컬 DNS에서 TTL 만큼 | 각 단계별 캐싱 |

---

### B-3. 서브넷 계산 — PM 네트워크 이해 필수

| CIDR 표기 | 서브넷 마스크 | 호스트 수 | 용도 |
|----------|------------|---------|------|
| /24 | 255.255.255.0 | 254 | 중소규모 사무실 |
| /25 | 255.255.255.128 | 126 | 부서 분리 |
| /28 | 255.255.255.240 | 14 | 소규모 팀 |
| /30 | 255.255.255.252 | 2 | P2P 링크 |

> **공식**: 사용 가능 호스트 = 2^(32-CIDR) - 2 (네트워크 주소 + 브로드캐스트 제외)

---

### B-4. 네트워크 프로토콜 계층별 장비 매핑

| OSI 계층 | TCP/IP 계층 | 장비 | 주요 프로토콜 |
|---------|-----------|------|------------|
| 7-5 응용/표현/세션 | 응용 계층 | Proxy, L7 LB | HTTP/S, SMTP, DNS, FTP |
| 4 전송 | 전송 계층 | 방화벽(stateful) | TCP, UDP |
| 3 네트워크 | 인터넷 계층 | 라우터, L3 스위치 | IP, ICMP, OSPF, BGP |
| 2 데이터링크 | 네트워크 접속 | L2 스위치, AP | Ethernet, Wi-Fi, ARP |
| 1 물리 | 네트워크 접속 | 허브, 케이블 | - |
