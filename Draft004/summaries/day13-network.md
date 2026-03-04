# Day 13: 네트워크 (Network)

## 📋 강의 개요

| 항목 | 내용 |
|------|------|
| **과목명** | 네트워크 기초 |
| **교육시간** | 8시간 (오전 4시간 / 오후 4시간) |
| **학습목표** | 네트워크 기초 개념과 인프라를 이해하여 IT 프로젝트에 활용한다 |
| **선수학습** | Day 1-12 |

---

## 🎯 학습 목표

1. OSI 7계층 모델의 각 계층 역할을 설명할 수 있다
2. TCP/IP, DNS, HTTP 등 핵심 프로토콜의 동작 원리를 이해할 수 있다
3. 네트워크 장비(라우터, 스위치, 방화벽)의 역할을 구분할 수 있다
4. 클라우드 인프라 모델(IaaS/PaaS/SaaS)을 이해하고 PM 관점에서 활용할 수 있다

---

## 📚 강의 구성

### 오전 세션 (4시간)

#### 1교시: 네트워크 개요 (1시간)
- **네트워크란?**: 두 대 이상의 컴퓨터가 데이터를 교환하기 위해 연결된 시스템
- **네트워크 분류**
  - LAN(Local Area Network): 건물/층 단위
  - WAN(Wide Area Network): 지역/국가/글로벌
  - MAN(Metropolitan Area Network): 도시 단위
  - WLAN(Wireless LAN): 무선 네트워크
  - VPN(Virtual Private Network): 가상 사설 네트워크
- **네트워크 토폴로지(Topology)**
  - 스타(Star), 버스(Bus), 링(Ring), 메시(Mesh), 트리(Tree)
- **PM이 네트워크를 알아야 하는 이유**
  - 시스템 인프라 요구사항 이해
  - 성능 요구사항의 현실성 판단
  - 네트워크 관련 리스크 식별

#### 2교시: OSI 7계층 모델 (1.5시간)
- **OSI(Open Systems Interconnection) 7계층**
  1. **물리 계층(Physical)**: 전기 신호, 케이블, 허브
     - 비트(Bit) 전송
     - 🚗 **비유: 도로 그 자체**
  2. **데이터 링크 계층(Data Link)**: MAC 주소, 스위치
     - 프레임(Frame) 전송, 오류 검출
     - 🏘️ **비유: 아파트 단지 내 배달**
  3. **네트워크 계층(Network)**: IP 주소, 라우터
     - 패킷(Packet) 전송, 라우팅
     - 🗺️ **비유: 내비게이션**
  4. **전송 계층(Transport)**: TCP/UDP, 포트 번호
     - 세그먼트(Segment) 전송, 신뢰성 보장
     - 📦 **비유: 택배 서비스 선택** (등기/일반)
  5. **세션 계층(Session)**: 세션 관리
     - 연결 수립, 유지, 종료
     - ☎️ **비유: 전화 통화 관리**
  6. **표현 계층(Presentation)**: 데이터 형식/암호화
     - 인코딩, 압축, 암호화
     - 🔐 **비유: 편지 봉투와 암호화**
  7. **응용 계층(Application)**: HTTP, FTP, SMTP
     - 사용자 인터페이스 제공
     - ✉️ **비유: 편지 내용 작성**
- **암기늕:** "**Please Do Not Throw Sausage Pizza Away**"
- **한글 암기법:** "물데네전세표응" (물리-데이터링크-네트워크-전송-세션-표현-응용)
- **데이터 캡슐화(Encapsulation)**: 데이터→세그먼트→패킷→프레임→비트
- **암기법**: "All People Seem To Need Data Processing" (응→물리)

#### 3교시: TCP/IP 프로토콜 (1.5시간)
- **TCP/IP 4계층 모델**
  - 네트워크 접근(Network Access) = 물리 + 데이터 링크
  - 인터넷(Internet) = 네트워크
  - 전송(Transport) = 전송
  - 응용(Application) = 세션 + 표현 + 응용
- **IP(Internet Protocol)**
  - IPv4: 32비트 (xxx.xxx.xxx.xxx), 약 43억 개 주소
  - IPv6: 128비트, 사실상 무한 주소
  - 서브넷 마스크(Subnet Mask): 네트워크/호스트 영역 구분
  - 공인 IP vs 사설 IP (10.x.x.x, 172.16-31.x.x, 192.168.x.x)
  - NAT(Network Address Translation): 사설→공인 IP 변환
- **TCP vs UDP**
  - TCP: 연결 지향, 신뢰성, 순서 보장 (3-Way Handshake)
  - UDP: 비연결, 빠름, 신뢰성 없음 (실시간 스트리밍, DNS)
- **포트 번호**
  - Well-known 포트: HTTP(80), HTTPS(443), FTP(21), SSH(22), SMTP(25)
  - 등록 포트: 1024-49151
  - 동적 포트: 49152-65535

### 오후 세션 (4시간)

#### 4교시: DNS, HTTP, REST API (1.5시간)
- **DNS(Domain Name System)**
  - 도메인 이름 → IP 주소 변환
  - DNS 계층 구조: 루트 → TLD(.com, .kr) → SLD → 호스트
  - DNS 질의 과정 (Recursive, Iterative)
  - DNS 레코드: A, AAAA, CNAME, MX, NS, TXT
- **HTTP/HTTPS**
  - HTTP(HyperText Transfer Protocol): 웹 통신 프로토콜
  - HTTP 메서드: GET, POST, PUT, DELETE, PATCH
  - HTTP 상태 코드: 2xx(성공), 3xx(리다이렉트), 4xx(클라이언트 오류), 5xx(서버 오류)
  - HTTPS: HTTP + SSL/TLS 암호화
- **REST API 개요**
  - RESTful 아키텍처 원칙
  - 자원(Resource): URI로 표현
  - 행위(Verb): HTTP 메서드
  - 표현(Representation): JSON, XML
  - PM 관점에서 API 인터페이스 이해의 중요성

#### 5교시: 네트워크 장비 및 인프라 (1.5시간)
- **핵심 네트워크 장비**
  - **허브(Hub)**: L1, 모든 포트에 브로드캐스트
  - **스위치(Switch)**: L2, MAC 주소 기반 포워딩
  - **라우터(Router)**: L3, IP 주소 기반 라우팅
  - **방화벽(Firewall)**: 침입 차단, 패킷 필터링, 상태 검사
  - **로드 밸런서(Load Balancer)**: 트래픽 분산
- **네트워크 모니터링**
  - SNMP, NetFlow
  - 네트워크 성능 지표: 대역폭, 지연시간(Latency), 패킷 손실
- **클라우드 인프라 (PM 관점)**
  - **IaaS**: 가상 서버·스토리지 (AWS EC2, Azure VM)
  - **PaaS**: 개발 플랫폼 (Heroku, Google App Engine)
  - **SaaS**: 완성 소프트웨어 (Gmail, Slack, Salesforce)
  - 퍼블릭 / 프라이빗 / 하이브리드 / 멀티 클라우드
  - 온프레미스 vs 클라우드 비교: 초기 투자·운영 비용·확장성·보안·관리 부담

#### 6교시: 네트워크 보안 및 PM 관점 (1시간)
- **네트워크 보안 기초**
  - 방화벽 정책 (화이트리스트 vs 블랙리스트)
  - DMZ(DeMilitarized Zone): 외부 접근 허용 영역
  - IDS(침입 탐지) vs IPS(침입 방지)
  - SSL/TLS 인증서
- **주요 네트워크 공격 유형**
  - DDoS, MITM(중간자 공격), ARP 스푸핑, DNS 하이재킹
- **PM이 네트워크 지식을 활용하는 장면**
  - 인프라 아키텍처 설계 리뷰
  - 성능 요구사항 정의 (SLA: 응답시간, 가용성)
  - 네트워크 관련 리스크 식별 및 관리
  - 조달 시 클라우드 vs 온프레미스 의사결정

---

## 📝 핵심 키워드

| 키워드 | 설명 |
|--------|------|
| OSI 7계층 | 네트워크 통신의 표준 참조 모델 |
| TCP/IP | 인터넷 표준 프로토콜 스택 |
| DNS | 도메인 이름 → IP 주소 변환 시스템 |
| HTTP/HTTPS | 웹 통신 프로토콜 / 암호화 웹 통신 |
| 방화벽/DMZ | 네트워크 트래픽 필터링 보안 장비 / 외부 접근 허용 영역 |
| IaaS/PaaS/SaaS | 클라우드 서비스 모델 (인프라→플랫폼→소프트웨어) |
| IDS/IPS | 침입 탐지(감지만) vs 침입 방지(차단까지) |

---

## ✅ 학습 확인 질문

1. OSI 7계층을 순서대로 나열하고, 각 계층의 역할을 한 줄로 설명하시오.
2. TCP와 UDP의 차이를 비교하고, 각각 어떤 상황에서 사용되는지 예시를 드시오.
3. IaaS, PaaS, SaaS의 차이를 IT 프로젝트 사례로 설명하시오.
4. PM이 REST API를 이해해야 하는 이유를 설명하시오.
5. IDS와 IPS의 차이를 설명하고, PM이 보안 요구사항 정의 시 어떻게 활용하는지 서술하시오.
