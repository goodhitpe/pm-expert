# Day 13 (Part 2): 네트워크 기초 - 심화편

> 📌 **이 파일은 Day 13 강의안의 파트 2입니다.**
> - **Part 1** ([day13-network-detail.md](./day13-network-detail.md)): 1교시~3교시 — 네트워크 개요, OSI 7계층, TCP/IP
> - **Part 2** (이 파일): 4교시~6교시 — DNS/HTTP/REST API, 네트워크 장비, 네트워크 보안

---

## 4교시: DNS, HTTP, REST API (1.5시간)

### 이론 (50분)

#### 1. DNS (Domain Name System)

**정의:**
도메인 이름(예: www.google.com)을 IP 주소(예: 172.217.26.46)로 변환하는 **분산 계층 구조 시스템**

**필요성:**
- 사람은 이름을 기억하기 쉬움 (www.naver.com)
- 컴퓨터는 숫자(IP)로 통신 (223.130.200.107)
- IP는 변경될 수 있지만 도메인은 유지
- 하나의 도메인을 여러 IP로 분산 가능 (로드 밸런싱)

**A. DNS 계층 구조**

```
                     . (Root)
                     |
        ┌────────────┼────────────┐
        │            │            │
       com          org          kr
        │            │            │
    ┌───┴───┐       │        ┌───┴───┐
  google  amazon   ietf     co.kr  or.kr
    │        │                 │
   www      www             naver
                              │
                             www
```

**1) Root DNS Servers (루트 서버)**
- 전 세계 13개 논리 서버 (a.root-servers.net ~ m.root-servers.net)
- 실제로는 수백 개의 물리 서버가 Anycast로 분산
- TLD(Top-Level Domain) 서버 정보 제공

**2) TLD (Top-Level Domain) Servers**
- **gTLD (Generic)**: .com, .org, .net, .edu, .gov
- **ccTLD (Country Code)**: .kr, .us, .jp, .cn, .uk
- **New gTLD**: .app, .dev, .tech, .ai
- 각 TLD는 권한 있는 기관이 관리 (예: .com → Verisign)

**3) Authoritative DNS Servers**
- 실제 도메인에 대한 IP 주소 보유
- 도메인 소유자가 직접 운영하거나 DNS 제공업체 이용
- 예: AWS Route53, Cloudflare DNS, Google Cloud DNS

**4) Local DNS Servers (Recursive Resolver)**
- ISP(인터넷 서비스 제공업체)나 조직에서 운영
- 클라이언트의 DNS 쿼리를 대신 처리
- 캐싱으로 성능 향상

**B. DNS 조회 과정 (Recursive Query)**

**예: www.google.com 조회**

```
클라이언트(192.168.1.100)
    ↓ 1) "www.google.com의 IP는?"
Local DNS (168.126.63.1, KT)
    ↓ 2) "www.google.com의 IP는?" (캐시 없음)
Root DNS Server (a.root-servers.net)
    ↓ 3) ".com TLD 서버 주소는 a.gtld-servers.net"
Local DNS
    ↓ 4) "www.google.com의 IP는?"
.com TLD Server (a.gtld-servers.net)
    ↓ 5) "google.com 권한 서버는 ns1.google.com"
Local DNS
    ↓ 6) "www.google.com의 IP는?"
google.com Authoritative Server (ns1.google.com)
    ↓ 7) "www.google.com = 172.217.26.46"
Local DNS (캐시 저장, TTL 동안 유지)
    ↓ 8) "172.217.26.46"
클라이언트 (캐시 저장, 실제 연결)
```

**단계별 설명:**

1. 사용자가 브라우저에서 www.google.com 입력
2. OS는 Local DNS 서버에 질의
3. Local DNS는 루트 서버에게 물어봄
4. 루트 서버는 .com TLD 서버 주소 반환
5. Local DNS는 .com TLD 서버에게 물어봄
6. TLD 서버는 google.com의 권한 서버 주소 반환
7. Local DNS는 google.com 권한 서버에게 물어봄
8. 권한 서버가 실제 IP 주소 반환
9. Local DNS는 클라이언트에게 IP 반환 (+ 캐싱)

**C. DNS 레코드 타입**

**주요 레코드:**

| 타입 | 설명 | 예시 | 용도 |
|------|------|------|------|
| **A** | IPv4 주소 | google.com → 172.217.26.46 | 도메인 → IP (가장 기본) |
| **AAAA** | IPv6 주소 | google.com → 2404:6800:4004:... | IPv6 매핑 |
| **CNAME** | 별칭 (Canonical Name) | www.example.com → example.com | 도메인 별칭 |
| **MX** | 메일 서버 | example.com → mail.example.com (우선순위 10) | 이메일 라우팅 |
| **NS** | 네임서버 | example.com → ns1.example.com | 권한 있는 DNS 서버 지정 |
| **TXT** | 텍스트 | SPF, DKIM, 도메인 소유 인증 | 인증, 설정 |
| **PTR** | 역방향 조회 | 8.8.8.8 → dns.google | IP → 도메인 |
| **SRV** | 서비스 레코드 | _http._tcp.example.com → server:8080 | 서비스 디스커버리 |

**레코드 예시:**

```dns
; A 레코드 (IPv4)
example.com.           300  IN  A      93.184.216.34
www.example.com.       300  IN  A      93.184.216.34

; AAAA 레코드 (IPv6)
example.com.           300  IN  AAAA   2606:2800:220:1:248:1893:25c8:1946

; CNAME 레코드
blog.example.com.      300  IN  CNAME  example.com.
shop.example.com.      300  IN  CNAME  shopify.com.

; MX 레코드 (메일)
example.com.           300  IN  MX     10 mail1.example.com.
example.com.           300  IN  MX     20 mail2.example.com.

; NS 레코드 (네임서버)
example.com.           300  IN  NS     ns1.example.com.
example.com.           300  IN  NS     ns2.example.com.

; TXT 레코드 (SPF, 도메인 인증)
example.com.           300  IN  TXT    "v=spf1 include:_spf.google.com ~all"
example.com.           300  IN  TXT    "google-site-verification=abcd1234..."
```

**TTL (Time To Live):**
- 캐시 유효 시간 (초 단위)
- 300 = 5분 동안 캐시 유지
- 짧으면: 변경 즉시 반영, 트래픽 증가
- 길면: DNS 쿼리 감소, 변경 반영 지연

**D. DNS 관련 개념**

**1) DNS 캐싱**

**레벨별 캐싱:**
```
브라우저 캐시 (chrome://net-internals/#dns)
    ↓
OS 캐시 (Windows: ipconfig /displaydns)
    ↓
Local DNS 캐시
    ↓
실제 DNS 조회
```

**캐시 플러시:**
```bash
# Windows
ipconfig /flushdns

# macOS
sudo dscacheutil -flushcache

# Linux
sudo systemd-resolve --flush-caches
```

**2) Round Robin DNS (간단한 로드 밸런싱)**

```dns
example.com.  IN  A  192.0.2.1
example.com.  IN  A  192.0.2.2
example.com.  IN  A  192.0.2.3
```

- 여러 A 레코드를 순환하며 반환
- 간단하지만 헬스 체크 없음
- 현대에는 로드 밸런서 사용 권장

**3) GeoDNS (지리적 라우팅)**

- 사용자 위치에 따라 다른 IP 반환
- 예: 한국 사용자 → 서울 서버, 미국 사용자 → 버지니아 서버
- AWS Route53, Cloudflare 지원

**PM이 알아야 할 점:**

**1) DNS 변경 전파 시간:**
- TTL이 300초 → 최대 5분 소요
- 배포 계획 시 고려 필요
- 중요 변경은 미리 TTL을 낮춤 (예: 3600 → 300)

**2) DNS 장애 대응:**
- NS 레코드를 여러 개 설정 (최소 2개)
- DNS 제공업체 이중화 (Primary/Secondary)
- 모니터링 (Uptime Robot, Pingdom)

**3) 보안:**
- DNSSEC: DNS 응답 위변조 방지
- DDoS 공격 대상이 되기 쉬움
- Cloudflare 같은 DNS Firewall 고려

**4) 비용:**
- 대부분 DNS 제공업체는 쿼리 기반 과금
- AWS Route53: 100만 쿼리당 $0.40
- Cloudflare: 무료/Pro 플랜 제공

#### 2. HTTP (HyperText Transfer Protocol)

**정의:**
웹에서 **클라이언트(브라우저)와 서버 간 데이터를 주고받기 위한** 프로토콜

**특징:**
- **무상태(Stateless)**: 각 요청은 독립적, 이전 요청 기억 안 함
- **텍스트 기반**: 사람이 읽을 수 있는 형식
- **요청-응답 모델**: 클라이언트가 요청, 서버가 응답
- **TCP 기반**: 80(HTTP), 443(HTTPS) 포트 사용

**A. HTTP 메서드 (HTTP Methods)**

| 메서드 | 설명 | 용도 | 멱등성 | 안전성 |
|--------|------|------|--------|--------|
| **GET** | 리소스 조회 | 데이터 가져오기 | ✅ | ✅ |
| **POST** | 리소스 생성 | 데이터 제출, 생성 | ❌ | ❌ |
| **PUT** | 리소스 전체 수정 | 데이터 대체 | ✅ | ❌ |
| **PATCH** | 리소스 부분 수정 | 일부 필드 수정 | ❌ | ❌ |
| **DELETE** | 리소스 삭제 | 데이터 삭제 | ✅ | ❌ |
| **HEAD** | 헤더만 조회 | 메타데이터 확인 | ✅ | ✅ |
| **OPTIONS** | 지원 메서드 확인 | CORS preflight | ✅ | ✅ |

**멱등성(Idempotent):** 여러 번 호출해도 결과가 동일  
**안전성(Safe):** 서버 상태를 변경하지 않음

**메서드 상세:**

**1) GET**
```http
GET /api/users/123 HTTP/1.1
Host: api.example.com
```

- 데이터를 URL에 포함 (쿼리 스트링)
- 브라우저 히스토리에 남음
- 북마크 가능
- 캐싱 가능
- 보안에 민감한 데이터는 사용 금지

**2) POST**
```http
POST /api/users HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "name": "김철수",
  "email": "kim@example.com"
}
```

- 데이터를 요청 본문(Body)에 포함
- 길이 제한 없음
- 히스토리에 안 남음
- 캐싱 안 됨

**3) PUT vs PATCH**

**PUT (전체 교체):**
```http
PUT /api/users/123 HTTP/1.1
Content-Type: application/json

{
  "name": "김철수",
  "email": "kim@example.com",
  "phone": "010-1234-5678"
}
```
→ 전체 리소스를 요청 데이터로 **대체**

**PATCH (부분 수정):**
```http
PATCH /api/users/123 HTTP/1.1
Content-Type: application/json

{
  "phone": "010-9876-5432"
}
```
→ 지정한 필드만 **수정**

**4) DELETE**
```http
DELETE /api/users/123 HTTP/1.1
```

**B. HTTP 상태 코드 (Status Codes)**

**1xx: 정보 (Informational)**
- **100 Continue**: 클라이언트가 요청 계속 진행해도 됨
- **101 Switching Protocols**: WebSocket 업그레이드

**2xx: 성공 (Success)**
- **200 OK**: 요청 성공
- **201 Created**: 리소스 생성 성공 (POST)
- **202 Accepted**: 요청 접수, 처리는 비동기
- **204 No Content**: 성공했지만 응답 본문 없음 (DELETE)

**3xx: 리다이렉션 (Redirection)**
- **301 Moved Permanently**: 영구적으로 이동 (SEO에 영향)
- **302 Found**: 임시 이동
- **304 Not Modified**: 캐시된 리소스 사용 가능

**4xx: 클라이언트 오류 (Client Error)**
- **400 Bad Request**: 잘못된 요청 (문법 오류)
- **401 Unauthorized**: 인증 필요 (로그인 필요)
- **403 Forbidden**: 권한 없음 (인증은 됐지만 접근 거부)
- **404 Not Found**: 리소스 없음
- **405 Method Not Allowed**: 허용되지 않은 메서드
- **409 Conflict**: 리소스 충돌 (중복 생성)
- **429 Too Many Requests**: 요청 횟수 제한 초과

**5xx: 서버 오류 (Server Error)**
- **500 Internal Server Error**: 서버 내부 오류
- **502 Bad Gateway**: 게이트웨이/프록시 오류
- **503 Service Unavailable**: 서비스 일시 중단 (유지보수, 과부하)
- **504 Gateway Timeout**: 게이트웨이 타임아웃

**PM이 알아야 할 점:**
- 200번대: 정상 동작
- 400번대: 클라이언트 문제 (사용자 오류, 입력 검증)
- 500번대: 서버 문제 (버그, 장애) → **긴급 대응 필요**

**C. HTTP 헤더 (Headers)**

**요청 헤더 (Request Headers):**

```http
GET /api/users HTTP/1.1
Host: api.example.com                  # 필수, 대상 서버
User-Agent: Mozilla/5.0 ...            # 클라이언트 정보
Accept: application/json               # 수락 가능한 응답 형식
Accept-Language: ko-KR,en;q=0.9        # 선호 언어
Accept-Encoding: gzip, deflate, br     # 압축 방식
Authorization: Bearer eyJhbGc...       # 인증 토큰
Content-Type: application/json         # 요청 본문 형식 (POST/PUT)
Content-Length: 348                    # 요청 본문 길이
Cookie: sessionid=abc123               # 쿠키
Referer: https://example.com/page      # 이전 페이지 URL
```

**응답 헤더 (Response Headers):**

```http
HTTP/1.1 200 OK
Date: Thu, 20 Feb 2026 05:30:00 GMT
Server: nginx/1.18.0                   # 서버 정보
Content-Type: application/json         # 응답 본문 형식
Content-Length: 1234                   # 응답 본문 길이
Content-Encoding: gzip                 # 압축 방식
Cache-Control: max-age=3600            # 캐싱 정책
ETag: "abc123"                         # 리소스 버전 식별자
Set-Cookie: sessionid=xyz; HttpOnly    # 쿠키 설정
Access-Control-Allow-Origin: *         # CORS 허용
X-RateLimit-Remaining: 99              # API 요청 횟수 제한
```

**D. HTTP/1.1 vs HTTP/2 vs HTTP/3**

| 특징 | HTTP/1.1 | HTTP/2 | HTTP/3 |
|------|----------|--------|--------|
| **출시 연도** | 1997 | 2015 | 2020 |
| **프로토콜** | 텍스트 | 바이너리 | 바이너리 |
| **전송 계층** | TCP | TCP | **QUIC (UDP)** |
| **멀티플렉싱** | ❌ (순차) | ✅ | ✅ |
| **헤더 압축** | ❌ | ✅ (HPACK) | ✅ (QPACK) |
| **Server Push** | ❌ | ✅ | ✅ |
| **우선순위** | ❌ | ✅ | ✅ |
| **HOL Blocking** | ✅ (심각) | 부분적 | ❌ |

**HTTP/1.1의 문제:**
- **Head-of-Line Blocking**: 앞 요청이 지연되면 뒤 요청도 대기
- **연결 제한**: 브라우저당 도메인 6~8개 연결
- **비효율적 헤더**: 중복 전송

**HTTP/2의 개선:**
- **Multiplexing**: 하나의 연결로 여러 요청 병렬 처리
- **Header Compression**: HPACK으로 헤더 압축
- **Server Push**: 서버가 필요 리소스 미리 전송
- **바이너리 프레임**: 파싱 속도 향상

**HTTP/3 (QUIC)의 혁신:**
- **UDP 기반**: TCP의 HOL Blocking 완전 해결
- **빠른 연결**: 0-RTT 재연결
- **내장 암호화**: TLS 1.3 통합
- **패킷 손실 독립**: 스트림별 재전송

**PM 관점:**
- 2026년 현재 HTTP/2는 표준
- HTTP/3는 Google, Cloudflare 등 주요 서비스 도입
- 레거시 시스템은 HTTP/1.1 여전히 사용
- 프로토콜 업그레이드는 인프라팀과 협의

#### 3. REST API (Representational State Transfer)

**정의:**
HTTP 프로토콜을 활용한 **웹 API 설계 아키텍처 스타일**

**REST의 핵심 원칙 6가지:**

**1) Client-Server (클라이언트-서버 분리)**
- UI와 비즈니스 로직 분리
- 독립적 개발 및 확장 가능

**2) Stateless (무상태)**
- 각 요청은 독립적
- 서버는 세션 정보 저장 안 함
- 인증 정보는 매 요청마다 포함 (토큰)

**3) Cacheable (캐시 가능)**
- 응답은 캐시 가능 여부 명시
- Cache-Control 헤더 사용
- 성능 향상 및 서버 부하 감소

**4) Uniform Interface (일관된 인터페이스)**
- URI로 리소스 식별
- HTTP 메서드로 행위 표현
- 표준 형식 (JSON, XML)

**5) Layered System (계층화)**
- 클라이언트는 최종 서버를 직접 알 필요 없음
- 중간에 로드 밸런서, 캐시, 프록시 가능

**6) Code on Demand (선택사항)**
- 서버가 실행 가능한 코드 전송 (JavaScript)

**A. RESTful API 설계 원칙**

**1) 리소스 중심 설계**

**좋은 예:**
```
GET    /users          # 사용자 목록 조회
GET    /users/123      # 특정 사용자 조회
POST   /users          # 사용자 생성
PUT    /users/123      # 사용자 전체 수정
PATCH  /users/123      # 사용자 부분 수정
DELETE /users/123      # 사용자 삭제
```

**나쁜 예 (동사 사용):**
```
GET    /getUsers           ❌
POST   /createUser         ❌
POST   /updateUser/123     ❌
GET    /deleteUser/123     ❌
```

**2) 계층 구조 표현**

```
GET /users/123/orders           # 사용자 123의 주문 목록
GET /users/123/orders/456       # 사용자 123의 주문 456
GET /orders/456/items           # 주문 456의 상품 목록
GET /categories/tech/products   # tech 카테고리의 상품
```

**3) 필터링, 정렬, 페이징**

```
# 필터링
GET /products?category=electronics&price_min=10000

# 정렬
GET /products?sort=price:desc

# 페이징
GET /products?page=2&limit=20

# 검색
GET /products?q=laptop

# 복합
GET /products?category=electronics&sort=price:asc&page=1&limit=10
```

**4) HTTP 메서드 올바른 사용**

| 메서드 | URL | 설명 | 응답 코드 |
|--------|-----|------|-----------|
| GET | /users | 사용자 목록 | 200 |
| GET | /users/123 | 특정 사용자 | 200, 404 |
| POST | /users | 사용자 생성 | 201, 400 |
| PUT | /users/123 | 전체 수정 | 200, 404 |
| PATCH | /users/123 | 부분 수정 | 200, 404 |
| DELETE | /users/123 | 삭제 | 204, 404 |

**5) 버전 관리**

**방법 1: URL 경로에 포함 (권장)**
```
/api/v1/users
/api/v2/users
```

**방법 2: 헤더에 포함**
```http
GET /api/users HTTP/1.1
Accept: application/vnd.example.v2+json
```

**방법 3: 쿼리 파라미터**
```
/api/users?version=2
```

**PM 권장:** URL 경로 방식이 명확하고 테스트 용이

**6) 응답 형식 (JSON 표준)**

**단일 리소스:**
```json
{
  "id": 123,
  "name": "김철수",
  "email": "kim@example.com",
  "created_at": "2026-02-20T14:30:00Z"
}
```

**리스트 (페이징 포함):**
```json
{
  "data": [
    {"id": 1, "name": "김철수"},
    {"id": 2, "name": "이영희"}
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "total_pages": 8
  },
  "links": {
    "self": "/api/users?page=1",
    "next": "/api/users?page=2",
    "last": "/api/users?page=8"
  }
}
```

**오류 응답:**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "입력값이 유효하지 않습니다.",
    "details": [
      {
        "field": "email",
        "message": "이메일 형식이 올바르지 않습니다."
      },
      {
        "field": "age",
        "message": "나이는 0보다 커야 합니다."
      }
    ]
  },
  "timestamp": "2026-02-20T14:30:00Z",
  "path": "/api/users"
}
```

**B. REST API 인증/인가**

**1) API Key**
```http
GET /api/users HTTP/1.1
X-API-Key: sk_live_abc123def456
```

**장점:** 간단  
**단점:** 키 노출 시 위험, 사용자별 권한 관리 어려움

**2) JWT (JSON Web Token)**

**구조:**
```
header.payload.signature

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**사용:**
```http
GET /api/users HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**장점:** 
- Stateless (서버에 세션 저장 불필요)
- Self-contained (토큰에 정보 포함)
- 확장 가능

**단점:**
- 크기 큼 (쿠키보다)
- 토큰 무효화 어려움

**3) OAuth 2.0**

**사용 사례:** 소셜 로그인, 제3자 API 접근 권한

**흐름:**
```
1. 클라이언트 → 인증 서버: 로그인 요청
2. 사용자 인증 및 권한 승인
3. 인증 서버 → 클라이언트: Authorization Code
4. 클라이언트 → 인증 서버: Code + Client Secret
5. 인증 서버 → 클라이언트: Access Token + Refresh Token
6. 클라이언트 → API 서버: Access Token으로 요청
```

**예: Google API 접근**
```http
GET /api/gmail/messages HTTP/1.1
Authorization: Bearer ya29.a0AfH6SMBx...
```

**C. REST API 모범 사례**

**1) HATEOAS (Hypermedia As The Engine Of Application State)**

**개념:** 응답에 다음 행동 가능한 링크 포함

```json
{
  "id": 123,
  "name": "김철수",
  "status": "active",
  "_links": {
    "self": {"href": "/api/users/123"},
    "orders": {"href": "/api/users/123/orders"},
    "deactivate": {"href": "/api/users/123/deactivate", "method": "POST"}
  }
}
```

**장점:** 클라이언트가 API 구조를 동적으로 탐색 가능

**2) Rate Limiting (요청 횟수 제한)**

```http
HTTP/1.1 200 OK
X-RateLimit-Limit: 1000         # 시간당 제한
X-RateLimit-Remaining: 950      # 남은 요청 수
X-RateLimit-Reset: 1614556800   # 리셋 시각 (Unix timestamp)
```

**초과 시:**
```http
HTTP/1.1 429 Too Many Requests
Retry-After: 3600

{
  "error": "요청 횟수 제한을 초과했습니다. 1시간 후 다시 시도하세요."
}
```

**3) API 문서화**

**도구:**
- **Swagger (OpenAPI)**: 대화형 문서, 테스트 가능
- **Postman**: 컬렉션 공유
- **API Blueprint**: 마크다운 기반

**Swagger 예시:**
```yaml
openapi: 3.0.0
info:
  title: User API
  version: 1.0.0
paths:
  /users:
    get:
      summary: 사용자 목록 조회
      parameters:
        - name: page
          in: query
          schema:
            type: integer
      responses:
        '200':
          description: 성공
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
```

**PM 역할:**
- API 문서는 계약서
- 프론트엔드/백엔드/외부 파트너 모두 참조
- 변경 이력 관리 (Breaking Change 주의)

---

### 예시 (25분)

#### 예시 1: DNS 장애로 인한 서비스 중단 - 이커머스 플랫폼

**프로젝트 배경:**
- 2021년, 월 거래액 100억 원의 이커머스 플랫폼
- 단일 DNS 제공업체 사용 (비용 절감)
- 도메인: shop.example.com

**장애 발생:**
2021년 10월 15일 오전 9시, DNS 제공업체의 데이터센터 화재로 인한 전면 장애

**증상:**
```bash
$ nslookup shop.example.com
Server:  168.126.63.1
Address:  168.126.63.1#53

** server can't find shop.example.com: SERVFAIL
```

- 사용자들이 사이트 접속 불가
- "사이트를 찾을 수 없습니다" 오류
- 서버는 정상이지만 도메인 조회 실패

**영향:**
- 서비스 중단 시간: 6시간
- 매출 손실: 약 2억 5천만 원 (100억 ÷ 30일 ÷ 24시간 × 6시간)
- 고객 불만 폭주사용
- 주가 하락 (상장 기업)

**즉각 조치 (실패):**

**시도 1: IP 직접 접속 안내**
```
https://203.123.45.67 로 접속하세요
```
- 문제: HTTPS 인증서 오류 (도메인 불일치)
- 대부분의 사용자가 이해 못 함

**시도 2: 다른 DNS로 변경**
- 새 DNS 제공업체 등록
- NS 레코드 변경
- 문제: **TTL 24시간** 설정으로 전파 지연
- 기존 DNS가 다운되어 변경 전파 안 됨

**근본 원인 분석:**

**1) Single Point of Failure**
- 단일 DNS 제공업체에 의존
- 백업 DNS 없음

**2) 높은 TTL 설정**
- TTL 86400초 (24시간)
- 캐시 만료까지 기다려야 함

**3) 모니터링 부족**
- DNS 헬스 체크 미설정
- 장애 인지 지연 (사용자 신고로 인지)

**개선 조치:**

**1) 멀티 DNS 프로바이더 구성**

```dns
; Primary DNS: AWS Route53
shop.example.com.  IN  NS  ns-123.awsdns-12.com.
shop.example.com.  IN  NS  ns-456.awsdns-34.net.

; Secondary DNS: Cloudflare
shop.example.com.  IN  NS  ns1.cloudflare.com.
shop.example.com.  IN  NS  ns2.cloudflare.com.
```

**아키텍처:**
```
사용자 요청
    ↓
DNS 쿼리 (Round Robin)
    ├─ AWS Route53 (Primary) ✅
    └─ Cloudflare (Secondary) ✅

한쪽 장애 시에도 다른 DNS로 조회 가능
```

**2) TTL 최적화**

```dns
; 일반 운영
shop.example.com.  3600  IN  A  203.123.45.67  # 1시간

; 배포/변경 전 (24시간 전)
shop.example.com.  300   IN  A  203.123.45.67  # 5분

; 변경 수행
shop.example.com.  300   IN  A  203.123.45.68  # 새 IP

; 변경 완료 후 (24시간 후)
shop.example.com.  3600  IN  A  203.123.45.68  # 다시 1시간
```

**3) 모니터링 및 알림**

```python
# DNS 모니터링 스크립트 (예시)
import dns.resolver
import time
import requests

def check_dns(domain):
    try:
        answers = dns.resolver.resolve(domain, 'A')
        ips = [str(rdata) for rdata in answers]
        print(f"✅ DNS 정상: {domain} → {ips}")
        return True
    except Exception as e:
        print(f"❌ DNS 오류: {domain} - {e}")
        # Slack/Email 알림
        send_alert(f"DNS 장애 감지: {domain}")
        return False

def check_http(url):
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            print(f"✅ HTTP 정상: {url}")
            return True
    except Exception as e:
        print(f"❌ HTTP 오류: {url} - {e}")
        return False

# 1분마다 체크
while True:
    check_dns('shop.example.com')
    check_http('https://shop.example.com')
    time.sleep(60)
```

**4) 재해 복구 계획 (DR Plan)**

```
DNS 장애 시 절차:
1. [0분] 모니터링 시스템이 자동 감지 및 알림
2. [5분] 엔지니어 확인 및 이슈 파악
3. [10분] Secondary DNS 상태 확인
4. [15분] 필요 시 Emergency IP 공지 (SNS, 이메일)
5. [30분] 임시 도메인 활성화 (shop2.example.com)
6. [1시간] 근본 원인 해결 또는 다른 DNS로 완전 이전
```

**결과:**
- 2022년 유사 장애 발생 시 15분 내 복구
- 멀티 DNS로 자동 페일오버
- 고객 영향 최소화

**PM 교훈:**
- 인프라의 단일 장애점(SPOF) 식별 및 제거
- 가용성이 중요한 서비스는 이중화 필수
- 재해 복구 계획 및 훈련 (Disaster Recovery Drill)
- 비용 절감이 장애 비용보다 클 수 있음

#### 예시 2: HTTP 상태 코드 오용으로 인한 통합 실패 - B2B API 프로젝트

**프로젝트 배경:**
- 2023년, 결제 시스템 API를 외부 파트너에게 제공
- 5개 파트너사와 통합
- RESTful API 표준을 따른다고 명시

**초기 API 설계 (문제가 있는 설계):**

```http
POST /api/payments HTTP/1.1

# 모든 경우에 200 OK 반환
HTTP/1.1 200 OK
Content-Type: application/json

# 성공
{"status": "success", "transaction_id": "TXN123"}

# 실패 (카드 거절)
{"status": "fail", "error": "카드가 거절되었습니다"}

# 오류 (서버 오류)
{"status": "error", "message": "Internal error"}
```

**문제 발생:**

**파트너사 A (대형 이커머스):**
```javascript
// 파트너사의 코드
const response = await fetch('/api/payments', {method: 'POST', body: data});

if (response.status === 200) {
    // 성공으로 간주하고 주문 완료 처리
    completeOrder();
} else {
    // 실패로 간주
    showError();
}
```

**결과:**
- 결제 실패했는데도 주문 완료 처리
- 고객은 결제 안 했는데 상품 배송
- 월 5천만 원 손실 발생

**파트너사 B (스타트업):**
- Error 로그 시스템이 HTTP 5xx만 감지
- 실제 오류가 발생해도 200 OK라 감지 못함
- 장애 대응 지연

**근본 원인:**
- HTTP 상태 코드를 무시하고 응답 본문에만 의존
- RESTful 원칙 위반
- API 문서와 실제 동작 불일치

**개선된 API 설계:**

**1) 성공 시 (201 Created):**
```http
POST /api/payments HTTP/1.1

HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/payments/TXN123

{
  "transaction_id": "TXN123",
  "amount": 50000,
  "status": "completed",
  "created_at": "2023-05-15T10:30:00Z"
}
```

**2) 클라이언트 오류 (400 Bad Request):**
```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": {
    "code": "INVALID_CARD",
    "message": "카드 번호가 유효하지 않습니다.",
    "field": "card_number"
  }
}
```

**3) 비즈니스 로직 실패 (402 Payment Required 또는 400):**
```http
HTTP/1.1 402 Payment Required
Content-Type: application/json

{
  "error": {
    "code": "INSUFFICIENT_FUNDS",
    "message": "잔액이 부족합니다.",
    "available_balance": 10000,
    "requested_amount": 50000
  }
}
```

**4) 서버 오류 (500 Internal Server Error):**
```http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    "request_id": "req_abc123",
    "timestamp": "2023-05-15T10:30:00Z"
  }
}
```

**5) 서비스 일시 중단 (503 Service Unavailable):**
```http
HTTP/1.1 503 Service Unavailable
Retry-After: 120
Content-Type: application/json

{
  "error": {
    "code": "MAINTENANCE",
    "message": "정기 점검 중입니다.",
    "estimated_recovery": "2023-05-15T11:00:00Z"
  }
}
```

**파트너사 코드 개선:**

```javascript
// 개선된 코드
try {
    const response = await fetch('/api/payments', {
        method: 'POST',
        body: JSON.stringify(paymentData),
        headers: {'Content-Type': 'application/json'}
    });
    
    if (response.status === 201) {
        // 성공
        const data = await response.json();
        completeOrder(data.transaction_id);
    } else if (response.status >= 400 && response.status < 500) {
        // 클라이언트 오류 (재시도 불필요)
        const error = await response.json();
        showUserError(error.error.message);
    } else if (response.status >= 500) {
        // 서버 오류 (재시도 가능)
        logError('Server error', response.status);
        retryLater();
    }
} catch (error) {
    // 네트워크 오류
    logError('Network error', error);
    showNetworkError();
}
```

**추가 개선 사항:**

**1) API 버전 관리:**
```
기존 API (하위 호환): /api/v1/payments
새 API: /api/v2/payments
```

**2) 상세한 문서화:**
```markdown
# POST /api/v2/payments

## 응답 코드
- `201 Created`: 결제 성공
- `400 Bad Request`: 잘못된 요청 (카드 번호 형식 오류 등)
- `402 Payment Required`: 결제 수단 문제 (잔액 부족, 카드 거절)
- `409 Conflict`: 중복 요청 (같은 idempotency key)
- `429 Too Many Requests`: 요청 횟수 초과
- `500 Internal Server Error`: 서버 내부 오류
- `503 Service Unavailable`: 일시적 서비스 중단

## Idempotency (멱등성)
중복 결제 방지를 위해 `Idempotency-Key` 헤더 사용

```http
POST /api/v2/payments
Idempotency-Key: unique-key-12345
```

같은 키로 재요청 시 이전 결과 반환 (실제 결제 안 함)
```

**3) 통합 테스트 환경:**
```
Sandbox: https://api-sandbox.example.com
- 테스트 카드 번호 제공
- 다양한 오류 시나리오 테스트 가능
- 무료
```

**결과:**
- 중복 결제 및 오류 처리 문제 해결
- 파트너사 통합 시간 50% 단축
- API 만족도 상승

**PM 교훈:**
- API는 계약(Contract)이며, 명확한 규칙 필요
- HTTP 표준을 따르면 개발자들이 직관적으로 이해
- 문서화는 선택이 아닌 필수
- Breaking Change는 버전 업으로 관리
- Sandbox 환경 제공으로 통합 테스트 지원

#### 예시 3: REST API 설계 개선으로 성능 향상 - 소셜 미디어 앱

**프로젝트 배경:**
- 2022년, 모바일 소셜 미디어 앱
- 사용자: 100만 명
- 문제: 앱 느림, 데이터 사용량 과다

**초기 API 설계 (Chatty API):**

**피드 조회:**
```http
GET /api/posts  # 게시글 목록 (10개)
[
  {"id": 1, "user_id": 101, "content": "..."},
  {"id": 2, "user_id": 102, "content": "..."},
  ...
]

# 각 게시글의 작성자 정보 조회 (10번)
GET /api/users/101
GET /api/users/102
...

# 각 게시글의 댓글 개수 조회 (10번)
GET /api/posts/1/comments/count
GET /api/posts/2/comments/count
...

# 각 게시글의 좋아요 개수 조회 (10번)
GET /api/posts/1/likes/count
GET /api/posts/2/likes/count
...

총 API 호출: 1 + 10 + 10 + 10 = 31번
```

**문제점:**

**1) N+1 Query 문제**
- 게시글 10개를 위해 31번 API 호출
- 네트워크 왕복 시간 누적 (31 × 50ms = 1.55초)

**2) 데이터 사용량**
- HTTP 오버헤드 (헤더)가 31번 반복
- 모바일 데이터 소진 가속

**3) 서버 부하**
- 불필요한 요청 증가
- DB 쿼리 중복 실행

**개선 1: Eager Loading (즉시 로딩)**

```http
GET /api/posts?include=user,comments_count,likes_count

Response:
[
  {
    "id": 1,
    "content": "...",
    "user": {
      "id": 101,
      "name": "김철수",
      "avatar": "..."
    },
    "comments_count": 5,
    "likes_count": 23,
    "created_at": "2022-05-15T10:30:00Z"
  },
  {
    "id": 2,
    "content": "...",
    "user": {
      "id": 102,
      "name": "이영희",
      "avatar": "..."
    },
    "comments_count": 12,
    "likes_count": 87,
    "created_at": "2022-05-15T09:15:00Z"
  },
  ...
]

총 API 호출: 1번  (97% 감소!)
```

**서버 구현 (예시 - SQL):**
```sql
-- N+1 문제 발생 (나쁜 예)
SELECT * FROM posts LIMIT 10;
-- 그 다음 각 post마다:
SELECT * FROM users WHERE id = ?;
SELECT COUNT(*) FROM comments WHERE post_id = ?;
SELECT COUNT(*) FROM likes WHERE post_id = ?;

-- Eager Loading (좋은 예)
SELECT 
    p.id, p.content, p.created_at,
    u.id as user_id, u.name as user_name, u.avatar,
    COUNT(DISTINCT c.id) as comments_count,
    COUNT(DISTINCT l.id) as likes_count
FROM posts p
LEFT JOIN users u ON p.user_id = u.id
LEFT JOIN comments c ON p.id = c.post_id
LEFT JOIN likes l ON p.id = l.post_id
GROUP BY p.id
LIMIT 10;
```

**개선 2: GraphQL 고려 (유연성)**

**기존 REST:**
```
GET /api/posts                     # 전체 정보 (오버페칭)
GET /api/posts?fields=id,content   # 일부 필드는 지원 안 할 수도
```

**GraphQL:**
```graphql
query {
  posts(limit: 10) {
    id
    content
    user {
      name
      avatar
    }
    commentsCount
    likesCount
  }
}
```

**장점:**
- 클라이언트가 필요한 필드만 요청
- 단일 엔드포인트
- Over-fetching / Under-fetching 해결

**단점:**
- 학습 곡선
- 캐싱 복잡
- 복잡한 쿼리 시 성능 이슈 (Depth 제한 필요)

**PM 의사결정:**
- 기존 시스템: REST 유지하되 Eager Loading 추가
- 신규 프로젝트: GraphQL 고려

**개선 3: 페이지네이션 최적화**

**Offset 방식 (비효율적):**
```http
GET /api/posts?page=100&limit=20

SQL:
SELECT * FROM posts
ORDER BY created_at DESC
LIMIT 20 OFFSET 2000;  # 2000개 스캔 후 20개 반환
```

**문제:** 뒤로 갈수록 느려짐 (10000번째 페이지는 매우 느림)

**Cursor 방식 (효율적):**
```http
GET /api/posts?limit=20

Response:
{
  "data": [...],
  "cursor": {
    "next": "eyJpZCI6MTIzLCJjcmVhdGVkX2F0IjoiMjAyMi0wNS0xNVQxMDozMDowMFoifQ=="
  }
}

# 다음 페이지
GET /api/posts?limit=20&cursor=eyJpZCI6MTIzLCJjcmVhdGVkX2F0IjoiMjAyMi0wNS0xNVQxMDozMDowMFoifQ==

SQL:
SELECT * FROM posts
WHERE (created_at, id) < ('2022-05-15T10:30:00Z', 123)
ORDER BY created_at DESC, id DESC
LIMIT 20;  # 인덱스 활용, 항상 빠름
```

**장점:**
- 일정한 성능
- 실시간 데이터 변경에 강함

**단점:**
- 특정 페이지로 바로 이동 불가

**최종 성능 개선 결과:**

| 지표 | 개선 전 | 개선 후 | 개선율 |
|------|---------|---------|--------|
| **API 호출 수** | 31번 | 1번 | 97% ↓ |
| **응답 시간** | 1.55초 | 0.08초 | 95% ↓ |
| **데이터 사용** | 450KB | 85KB | 81% ↓ |
| **서버 CPU** | 70% | 25% | 64% ↓ |
| **사용자 만족도** | 6.2/10 | 8.9/10 | 43% ↑ |

**PM 교훈:**
- API 설계는 성능에 직접적 영향
- N+1 문제는 매우 흔하고 치명적
- 모바일 앱은 네트워크 효율성이 중요
- 사용자 경험(UX) = 성능
- 초기 설계가 잘못되면 나중에 고치기 어려움

---

### 실습 (20분)

#### 실습 1: DNS 조회 및 레코드 확인

**과제:**
주요 웹사이트의 DNS 레코드를 조회하고, 어떤 인프라를 사용하는지 분석하세요.

**요구사항:**
1. `nslookup` 또는 `dig` 명령어 사용
2. A, AAAA, CNAME, MX, NS 레코드 확인
3. 결과 해석 및 분석

**실습 대상:**
- google.com
- github.com
- naver.com

**Windows (nslookup):**
```powershell
# A 레코드 (IPv4)
nslookup google.com

# 특정 레코드 타입
nslookup -type=MX google.com
nslookup -type=NS google.com
nslookup -type=AAAA google.com
```

**Linux/Mac (dig):**
```bash
# A 레코드
dig google.com

# 모든 레코드
dig google.com ANY

# 특정 레코드
dig google.com MX
dig google.com NS
dig google.com AAAA
```

---

**해설:**

**1) google.com 분석**

```powershell
PS> nslookup google.com
서버:    kns.kornet.net
Address:  168.126.63.1

권한 없는 응답:
이름:    google.com
Addresses:  2404:6800:4004:825::200e
          142.250.196.110
```

**분석:**
- **IPv4**: 142.250.196.110
- **IPv6**: 2404:6800:4004:825::200e
- **특징**: 
  - Dual Stack (IPv4 + IPv6)
  - GeoDNS 사용 (지역마다 다른 IP 반환)
  - Anycast로 전 세계 분산

**MX 레코드 (메일):**
```powershell
PS> nslookup -type=MX google.com
google.com      MX preference = 10, mail exchanger = smtp.google.com
```

**NS 레코드 (네임서버):**
```powershell
PS> nslookup -type=NS google.com
google.com      nameserver = ns1.google.com
google.com      nameserver = ns2.google.com
google.com      nameserver = ns3.google.com
google.com      nameserver = ns4.google.com
```

**인사이트:**
- Google은 자체 DNS 인프라 운영
- 글로벌 분산 아키텍처
- 고가용성 (NS 4개)

**2) github.com 분석**

```bash
$ dig github.com

; <<>> DiG 9.10.6 <<>> github.com
;; ANSWER SECTION:
github.com.             60      IN      A       140.82.121.4
```

**TTL 분석:**
- TTL = 60초 (매우 짧음)
- 이유: 빠른 장애 복구, 트래픽 분산 조정
- 트레이드오프: DNS 쿼리 증가

**CNAME 예시 (GitHub Pages):**
```bash
$ dig yourusername.github.io

yourusername.github.io.  3600  IN  CNAME  github.github.io.
github.github.io.        3600  IN  A      185.199.108.153
```

**3) naver.com 분석**

```bash
$ dig naver.com

naver.com.              21600   IN      A       223.130.200.107
naver.com.              21600   IN      A       223.130.195.200
```

**분석:**
- 2개의 A 레코드 (Round Robin)
- TTL = 21600초 (6시간)
- 국내 서비스 중심 (GeoDNS 덜 중요)

**PM 관점 분석:**

| 서비스 | TTL | IP 개수 | 전략 |
|--------|-----|---------|------|
| **Google** | 300초 | 다수 | 글로벌, 빠른 변경 |
| **GitHub** | 60초 | 적음 | 신속한 장애 대응 |
| **Naver** | 21600초 | 2개 | 안정성, 캐싱 |

**실습 확장:**

**Python으로 DNS 조회:**
```python
import dns.resolver

def query_dns(domain, record_type='A'):
    try:
        answers = dns.resolver.resolve(domain, record_type)
        print(f"\n{domain} - {record_type} 레코드:")
        for rdata in answers:
            print(f"  {rdata}")
            if hasattr(answers, 'response'):
                print(f"  TTL: {answers.rrset.ttl}초")
    except Exception as e:
        print(f"오류: {e}")

# 테스트
domains = ['google.com', 'github.com', 'naver.com']
record_types = ['A', 'AAAA', 'MX', 'NS']

for domain in domains:
    for record_type in record_types:
        query_dns(domain, record_type)
```

#### 실습 2: REST API 설계 및 테스트

**과제:**
간단한 도서 관리 REST API를 설계하고, Python Flask로 구현하세요.

**요구사항:**

**리소스:** Books (도서)

**엔드포인트:**
1. 도서 목록 조회 (페이징)
2. 특정 도서 조회
3. 도서 생성
4. 도서 수정
5. 도서 삭제

**필드:**
- id (자동 생성)
- title (제목)
- author (저자)
- isbn (ISBN)
- published_year (출판년도)
- created_at (생성일시)

---

**해설:**

**API 설계:**

| 메서드 | URL | 설명 | 상태 코드 |
|--------|-----|------|-----------|
| GET | /api/books | 도서 목록 | 200 |
| GET | /api/books/{id} | 특정 도서 | 200, 404 |
| POST | /api/books | 도서 생성 | 201, 400 |
| PUT | /api/books/{id} | 도서 수정 | 200, 404, 400 |
| DELETE | /api/books/{id} | 도서 삭제 | 204, 404 |

**구현 (Flask):**

```python
# app.py
from flask import Flask, request, jsonify
from datetime import datetime

app = Flask(__name__)

# 메모리 DB (실제로는 PostgreSQL 등 사용)
books_db = {}
next_id = 1

@app.route('/api/books', methods=['GET'])
def get_books():
    """도서 목록 조회 (페이징)"""
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 10))
    
    # 페이징 계산
    start = (page - 1) * limit
    end = start + limit
    
    books_list = list(books_db.values())
    paginated_books = books_list[start:end]
    
    return jsonify({
        'data': paginated_books,
        'meta': {
            'page': page,
            'limit': limit,
            'total': len(books_list),
            'total_pages': (len(books_list) + limit - 1) // limit
        }
    }), 200

@app.route('/api/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    """특정 도서 조회"""
    book = books_db.get(book_id)
    
    if not book:
        return jsonify({
            'error': {
                'code': 'NOT_FOUND',
                'message': f'ID {book_id}인 도서를 찾을 수 없습니다.'
            }
        }), 404
    
    return jsonify(book), 200

@app.route('/api/books', methods=['POST'])
def create_book():
    """도서 생성"""
    global next_id
    
    data = request.get_json()
    
    # 유효성 검사
    required_fields = ['title', 'author', 'isbn', 'published_year']
    for field in required_fields:
        if field not in data:
            return jsonify({
                'error': {
                    'code': 'VALIDATION_ERROR',
                    'message': f'{field} 필드는 필수입니다.'
                }
            }), 400
    
    # 도서 생성
    book = {
        'id': next_id,
        'title': data['title'],
        'author': data['author'],
        'isbn': data['isbn'],
        'published_year': data['published_year'],
        'created_at': datetime.utcnow().isoformat() + 'Z'
    }
    
    books_db[next_id] = book
    next_id += 1
    
    return jsonify(book), 201

@app.route('/api/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    """도서 수정 (전체)"""
    book = books_db.get(book_id)
    
    if not book:
        return jsonify({
            'error': {
                'code': 'NOT_FOUND',
                'message': f'ID {book_id}인 도서를 찾을 수 없습니다.'
            }
        }), 404
    
    data = request.get_json()
    
    # 전체 교체 (PUT)
    book.update({
        'title': data.get('title', book['title']),
        'author': data.get('author', book['author']),
        'isbn': data.get('isbn', book['isbn']),
        'published_year': data.get('published_year', book['published_year']),
    })
    
    return jsonify(book), 200

@app.route('/api/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    """도서 삭제"""
    if book_id not in books_db:
        return jsonify({
            'error': {
                'code': 'NOT_FOUND',
                'message': f'ID {book_id}인 도서를 찾을 수 없습니다.'
            }
        }), 404
    
    del books_db[book_id]
    
    # 204 No Content (본문 없음)
    return '', 204

if __name__ == '__main__':
    # 테스트 데이터
    books_db[1] = {
        'id': 1,
        'title': '클린 코드',
        'author': '로버트 C. 마틴',
        'isbn': '9788966260959',
        'published_year': 2013,
        'created_at': '2026-02-20T00:00:00Z'
    }
    next_id = 2
    
    app.run(debug=True, port=5000)
```

**테스트 (curl):**

```bash
# 1. 도서 목록 조회
curl http://localhost:5000/api/books

# 2. 특정 도서 조회
curl http://localhost:5000/api/books/1

# 3. 도서 생성
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "리팩터링",
    "author": "마틴 파울러",
    "isbn": "9788966261253",
    "published_year": 2020
  }'

# 4. 도서 수정
curl -X PUT http://localhost:5000/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "클린 코드 (개정판)",
    "author": "로버트 C. 마틴",
    "isbn": "9788966260959",
    "published_year": 2021
  }'

# 5. 도서 삭제
curl -X DELETE http://localhost:5000/api/books/1
```

**Python 클라이언트:**

```python
# client.py
import requests

BASE_URL = 'http://localhost:5000/api/books'

# 1. 도서 생성
response = requests.post(BASE_URL, json={
    'title': 'HTTP 완벽 가이드',
    'author': '데이빗 고울리',
    'isbn': '9788966261208',
    'published_year': 2014
})
print(f"생성: {response.status_code}")
print(response.json())
book_id = response.json()['id']

# 2. 도서 조회
response = requests.get(f"{BASE_URL}/{book_id}")
print(f"\n조회: {response.status_code}")
print(response.json())

# 3. 도서 목록
response = requests.get(BASE_URL, params={'page': 1, 'limit': 10})
print(f"\n목록: {response.status_code}")
print(response.json())

# 4. 도서 수정
response = requests.put(f"{BASE_URL}/{book_id}", json={
    'title': 'HTTP 완벽 가이드 (개정판)',
    'author': '데이빗 고울리',
    'isbn': '9788966261208',
    'published_year': 2022
})
print(f"\n수정: {response.status_code}")
print(response.json())

# 5. 도서 삭제
response = requests.delete(f"{BASE_URL}/{book_id}")
print(f"\n삭제: {response.status_code}")

# 6. 삭제 확인 (404 예상)
response = requests.get(f"{BASE_URL}/{book_id}")
print(f"\n삭제 확인: {response.status_code}")
print(response.json())
```

**PM 체크리스트:**

- [ ] API 엔드포인트가 RESTful 원칙 준수
- [ ] HTTP 상태 코드가 적절히 사용됨
- [ ] 오류 응답이 일관된 형식
- [ ] 페이징 지원 (대량 데이터 처리)
- [ ] 유효성 검사 (400 Bad Request)
- [ ] 존재하지 않는 리소스 처리 (404)
- [ ] API 문서화 (Swagger 등)
- [ ] 인증/인가 (실제 프로젝트에서 필수)

#### 실습 3: HTTP 요청/응답 분석

**과제:**
브라우저 개발자 도구를 사용하여 실제 웹사이트의 HTTP 요청을 분석하세요.

**요구사항:**
1. 주요 웹사이트 접속 (예: naver.com, github.com)
2. Network 탭에서 HTTP 요청/응답 확인
3. 헤더, 상태 코드, 타이밍 분석

---

**해설:**

**1) Chrome DevTools 사용**

```
1. Chrome 열기
2. F12 또는 Ctrl+Shift+I (개발자 도구)
3. Network 탭 선택
4. 웹사이트 접속 (예: github.com)
5. 요청 목록 확인
```

**주요 확인 사항:**

**A. 초기 요청 (Document):**
```
Request URL: https://github.com/
Request Method: GET
Status Code: 200 OK
```

**요청 헤더:**
```
:method: GET
:path: /
:scheme: https
accept: text/html,application/xhtml+xml,...
accept-encoding: gzip, deflate, br
accept-language: ko-KR,ko;q=0.9,en;q=0.8
user-agent: Mozilla/5.0 ...
```

**응답 헤더:**
```
content-encoding: gzip
content-type: text/html; charset=utf-8
date: Thu, 20 Feb 2026 05:30:00 GMT
server: GitHub.com
set-cookie: _gh_sess=...; path=/; secure; HttpOnly; SameSite=Lax
strict-transport-security: max-age=31536000
x-frame-options: deny
```

**분석:**
- **gzip 압축**: 전송 크기 감소
- **HSTS**: HTTPS 강제
- **X-Frame-Options: deny**: 클릭재킹 방지
- **HttpOnly 쿠키**: XSS 공격 방지

**B. 정적 리소스 (CSS, JS, 이미지):**

```
GET /assets/main.css
Status: 200 (cache)
Cache-Control: public, max-age=31536000, immutable
```

**캐싱 전략:**
- `max-age=31536000`: 1년 동안 캐시
- `immutable`: 변경되지 않음 (파일명에 해시 포함)
- 예: `main-a1b2c3d4.css`

**C. API 요청 (XHR/Fetch):**

```
POST /api/user/status
Content-Type: application/json
Authorization: Bearer eyJhbGc...

응답:
{"status": "online", "last_seen": "2026-02-20T05:30:00Z"}
```

**2) Waterfall 분석**

```
요청 타임라인:
───────────────────────────────────────────
DNS Lookup:       10ms
TCP Connect:      20ms
TLS Handshake:    30ms
Request sent:     5ms
Waiting (TTFB):   100ms
Content Download: 50ms
───────────────────────────────────────────
Total:            215ms
```

**병목 지점 식별:**
- **DNS**: 10ms → 정상
- **TTFB**: 100ms → 서버 처리 시간 (최적화 필요?)
- **Download**: 50ms → 파일 크기 확인

**3) HTTP/2 Multiplexing 확인**

```
Protocol: h2 (HTTP/2)

동시 로딩:
- main.css
- app.js
- logo.png
- ...

모두 하나의 TCP 연결 사용
```

**PM 인사이트:**

**성능 최적화 체크리스트:**
- [ ] HTTP/2 사용 여부
- [ ] gzip/brotli 압축 적용
- [ ] 정적 리소스 캐싱 (1년)
- [ ] CDN 사용
- [ ] 이미지 최적화 (WebP, lazy loading)
- [ ] DNS 조회 시간 < 50ms
- [ ] TTFB < 200ms
- [ ] 페이지 로드 시간 < 3초

---

### 퀴즈 (15분)

#### 객관식 (각 5점, 총 25점)

**1. DNS의 루트 서버(Root DNS Server) 개수는?**

① 1개  
② 5개  
③ 13개  
④ 100개  
⑤ 제한 없음

**정답:** ③

**해설:**  
DNS 루트 서버는 논리적으로 **13개**입니다 (a.root-servers.net ~ m.root-servers.net). 하지만 실제로는 Anycast 기술로 전 세계 수백 개의 물리 서버가 분산되어 있습니다. 13개로 제한된 이유는 UDP 패킷 크기 제한(512바이트) 때문입니다.

---

**2. HTTP 메서드 중 멱등성(Idempotent)을 보장하지 않는 것은?**

① GET  
② PUT  
③ POST  
④ DELETE  
⑤ HEAD

**정답:** ③

**해설:**  
**멱등성**이란 같은 요청을 여러 번 호출해도 결과가 동일한 것을 의미합니다.

- **GET, PUT, DELETE, HEAD**: 멱등성 ✅
  - GET /users/1 → 몇 번을 호출해도 같은 결과
  - DELETE /users/1 → 두 번째부터는 이미 삭제됨 (상태 동일)
  - PUT /users/1 → 전체를 대체하므로 멱등
  
- **POST**: 멱등성 ❌
  - POST /users → 호출할 때마다 새로운 사용자 생성
  - 중복 생성 방지하려면 Idempotency-Key 사용

---

**3. RESTful API에서 사용자 123의 주문 목록을 조회하는 올바른 URL은?**

① GET /api/getUserOrders?id=123  
② GET /api/users/123/orders  
③ POST /api/orders/getByUser/123  
④ GET /api/orders?user_id=123  
⑤ GET /api/get/user/123/orders

**정답:** ②

**해설:**  
RESTful API 설계 원칙:
- **리소스 중심**: 명사 사용 (/users, /orders)
- **HTTP 메서드로 행위 표현**: GET (조회), POST (생성) 등
- **계층 구조 표현**: /users/{id}/orders

**올바른 예:**
- ② `GET /api/users/123/orders` ✅ (가장 RESTful)
- ④ `GET /api/orders?user_id=123` ✅ (허용되지만 덜 명확)

**잘못된 예:**
- ① URL에 동사 사용 (getUserOrders)
- ③ POST 메서드로 조회 (GET 사용해야 함)
- ⑤ /get 경로 사용 (HTTP 메서드로 표현)

---

**4. HTTP 상태 코드 중 "리소스가 성공적으로 생성되었음"을 나타내는 것은?**

① 200 OK  
② 201 Created  
③ 202 Accepted  
④ 204 No Content  
⑤ 301 Moved Permanently

**정답:** ②

**해설:**  
**201 Created**는 POST 요청으로 새로운 리소스가 생성되었음을 나타냅니다.

```http
POST /api/users HTTP/1.1

HTTP/1.1 201 Created
Location: /api/users/123  # 생성된 리소스 위치
Content-Type: application/json

{
  "id": 123,
  "name": "김철수",
  ...
}
```

**다른 2xx 코드:**
- **200 OK**: 일반적인 성공 (GET, PUT, PATCH)
- **202 Accepted**: 요청 접수 (비동기 처리)
- **204 No Content**: 성공했지만 응답 본문 없음 (DELETE)

---

**5. HTTPS (HTTP Secure)에서 사용하는 기본 포트 번호는?**

① 22  
② 80  
③ 443  
④ 8080  
⑤ 3000

**정답:** ③

**해설:**  
- **HTTP**: 포트 **80** (암호화 없음)
- **HTTPS**: 포트 **443** (SSL/TLS 암호화)

**HTTPS의 중요성:**
- 데이터 암호화 (중간자 공격 방지)
- 무결성 보장 (데이터 위변조 방지)
- 인증 (신뢰할 수 있는 서버 확인)
- SEO 향상 (Google 순위 요소)
- 브라우저 경고 없음

**PM 체크리스트:**
- [ ] 프로덕션 환경은 반드시 HTTPS 사용
- [ ] SSL 인증서 자동 갱신 설정 (Let's Encrypt)
- [ ] HTTP-to-HTTPS 리다이렉트 설정
- [ ] HSTS 헤더 설정 (HTTPS 강제)

#### 주관식 (각 15점, 총 45점)

**6. PM이 글로벌 서비스를 기획 중입니다. DNS를 이용한 지리적 트래픽 라우팅(GeoDNS)의 작동 원리와 장점 3가지, 그리고 PM이 고려해야 할 사항 2가지를 설명하세요.**

**모범 답안:**

**작동 원리:**

**1) 사용자 위치 파악**
```
사용자 (서울) → DNS 쿼리
Local DNS Server IP: 168.126.63.1 (KT, 한국)
       ↓
GeoDNS Server (예: AWS Route53)
       ↓
IP 주소로 지역 판단: 한국(KR)
```

**2) 지역별 라우팅 정책 적용**
```dns
# AWS Route53 Geolocation Routing 예시
example.com (한국) → 43.201.123.45 (서울 리전)
example.com (미국) → 54.215.67.89 (버지니아 리전)
example.com (유럽) → 18.195.234.12 (아일랜드 리전)
example.com (기본) → 13.125.45.67 (서울 리전, fallback)
```

**3) 최적의 IP 반환**
```
GeoDNS → 사용자: "43.201.123.45" (서울 서버)
사용자 → 서울 서버 직접 접속
```

**장점:**

**1) 지연 시간 단축**
- 물리적으로 가까운 서버 접속
- 예: 서울 사용자 → 서울 서버 (RTT 5ms)
- vs. 서울 사용자 → 미국 서버 (RTT 150ms)
- **30배 이상 빠름**

**2) 법규 준수 (Data Residency)**
- 개인정보보호법: 특정 국가 데이터는 국내 저장 의무
- 예: EU GDPR - 유럽 사용자 데이터는 EU 내 처리
- GeoDNS로 자동으로 해당 리전 서버 연결
- 컴플라이언스 리스크 감소

**3) 트래픽 분산 및 가용성 향상**
- 리전별 부하 분산
- 한 리전 장애 시 다른 리전으로 페일오버
- 예: 서울 리전 다운 → 싱가포르 리전으로 자동 전환
- 글로벌 사용자에게 고가용성 제공

**PM이 고려해야 할 사항:**

**1) 비용 증가**

**인프라 비용:**
```
단일 리전:
- 서버: AWS EC2 10대 (서울)
- 월 비용: $1,000

멀티 리전 (3개):
- 서버: AWS EC2 10대 × 3 리전
- 데이터베이스 복제
- 리전 간 데이터 전송
- 월 비용: $3,500~$4,000 (3.5~4배)
```

**DNS 비용:**
```
AWS Route53:
- Hosted Zone: $0.50/월
- Geolocation Query: 100만 건당 $0.70
- Health Check: $0.50/endpoint/월

월 1억 쿼리 시: 약 $70~$100
```

**ROI 분석 필요:**
- 글로벌 사용자 비율
- 지역별 매출 기여도
- 성능 개선으로 인한 전환율 향상

**2) 데이터 동기화 및 일관성**

**문제 상황:**
```
사용자 A (서울) → 서울 DB에 데이터 저장
사용자 A (뉴욕 여행) → 뉴욕 서버 접속
→ 뉴욕 DB에는 데이터가 아직 복제 안 됨
→ 데이터 불일치
```

**해결책:**

**방법 1: Active-Active 복제 (양방향)**
```
서울 DB ←─→ 뉴욕 DB ←─→ 런던 DB
(실시간 동기화, 지연 100~500ms)
```
- 장점: 최신 데이터
- 단점: 복잡, 충돌 가능

**방법 2: 글로벌 데이터베이스 (AWS Aurora Global)**
```
Primary (서울) → Read Replica (뉴욕, 런던)
(1초 이내 복제)
```
- 쓰기: Primary만
- 읽기: 모든 리전

**방법 3: 사용자 세션 기반 라우팅**
```
사용자 A는 항상 서울 리전으로 라우팅
(GeoDNS + Session Affinity)
```
- 일관성 보장
- 지연시간 희생

**PM 의사결정 프레임워크:**

```
질문 1: 글로벌 사용자 비율이 30% 이상인가?
  → YES: GeoDNS 고려
  → NO: 단일 리전으로 시작

질문 2: 지역별 성능 차이가 사용자 경험에 중대한 영향을 미치는가?
  → YES (실시간, 금융): 필수
  → NO (배치, 분석): 선택

질문 3: 데이터 지역성 법규가 있는가?
  → YES: 필수
  → NO: 비용 대비 효과 분석

질문 4: 예산이 충분한가?
  → YES: 3개 이상 리전
  → NO: 2개 리전으로 시작 (주요 시장)
```

**실행 계획 예시:**

```
Phase 1 (현재): 단일 리전 (서울)
  - 국내 사용자 최적화
  - 글로벌 사용자는 CDN으로 커버 (정적 콘텐츠만)

Phase 2 (6개월 후): Multi-Region (서울 + 버지니아)
  - 글로벌 사용자 20% 도달 시
  - GeoDNS 적용
  - 데이터베이스 복제 구성

Phase 3 (1년 후): Global (서울 + 버지니아 + 프랑크푸르트)
  - 유럽 사용자 10% 도달 시
  - GDPR 준수 필요 시
```

---

**7. REST API에서 HTTP 상태 코드를 올바르게 사용하는 것이 중요한 이유 3가지를 설명하고, 다음 시나리오별로 적절한 상태 코드를 제시하세요: (1) 사용자 생성 성공, (2) 존재하지 않는 리소스 조회, (3) 인증 토큰 만료, (4) 서버 내부 오류, (5) 요청 횟수 제한 초과**

**모범 답안:**

**중요한 이유:**

**1) 클라이언트의 자동화된 오류 처리**

**나쁜 예 (모두 200 OK):**
```javascript
const response = await fetch('/api/payment');
if (response.status === 200) {
    const data = await response.json();
    if (data.status === 'success') {
        // 성공 처리
    } else if (data.error === 'insufficient_funds') {
        // 잔액 부족
    } else if (data.error === 'server_error') {
        // 서버 오류 → 재시도?
    }
    // 수십 가지 케이스마다 다른 처리 필요
}
```

**좋은 예 (HTTP 상태 코드 활용):**
```javascript
try {
    const response = await fetch('/api/payment');
    
    if (response.status === 201) {
        // 결제 성공
        const data = await response.json();
        completeOrder(data.transaction_id);
    } else if (response.status >= 400 && response.status < 500) {
        // 클라이언트 오류 (사용자 문제, 재시도 불필요)
        const error = await response.json();
        showUserError(error.message);
    } else if (response.status >= 500) {
        // 서버 오류 (재시도 가능)
        retryAfterDelay();
    }
} catch (error) {
    // 네트워크 오류
    showNetworkError();
}
```

**자동화 이점:**
- HTTP 표준 프레임워크/라이브러리가 자동 처리
- 예: Axios는 4xx/5xx를 자동으로 Promise reject
- 재시도 로직을 상태 코드 기반으로 구현

**2) 모니터링 및 알림 시스템**

**상태 코드 기반 모니터링:**
```
Prometheus + Grafana:

# 5xx 오류율 모니터링
rate(http_requests_total{status=~"5.."}[5m]) > 0.05

알림 규칙:
- 5xx 오류율 5% 초과 → 즉시 알림 (심각)
- 4xx 오류율 20% 초과 → 경고 (사용자 오류 증가)
- 429 증가 → 정보 (트래픽 급증, 스케일링 필요)
```

**로그 분석:**
```
2026-02-20 10:30:00 | 200 | /api/users | 45ms
2026-02-20 10:30:01 | 201 | /api/orders | 120ms
2026-02-20 10:30:02 | 404 | /api/products/999 | 10ms
2026-02-20 10:30:03 | 500 | /api/payment | 5000ms ⚠️

→ 500 오류 자동 감지 및 Slack 알림
→ 5000ms 응답 지연 → 성능 이슈 의심
```

**모두 200 OK라면:**
- 오류 탐지 불가능
- 응답 본문을 파싱해야 오류 확인
- 알림 시스템 구축 복잡

**3) API 의미론 및 의도 명확화**

**HTTP 상태 코드는 국제 표준:**
- RFC 7231 (HTTP/1.1)
- 전 세계 개발자가 동일하게 이해
- 문서 없이도 직관적

**예시:**
```
201 Created → "새로운 리소스가 생성되었구나"
304 Not Modified → "캐시된 데이터 사용하면 되겠네"
429 Too Many Requests → "요청을 줄여야겠어"
503 Service Unavailable → "서비스 일시 중단, 나중에 재시도"
```

**파트너사/외부 개발자:**
- 상태 코드만 보고도 70% 이상 이해 가능
- 통합 시간 단축
- 지원 요청 감소

---

**시나리오별 적절한 상태 코드:**

**(1) 사용자 생성 성공**

**상태 코드:** `201 Created`

```http
POST /api/users HTTP/1.1
Content-Type: application/json

{
  "name": "김철수",
  "email": "kim@example.com"
}

───────────────────────────────────────

HTTP/1.1 201 Created
Location: /api/users/123
Content-Type: application/json

{
  "id": 123,
  "name": "김철수",
  "email": "kim@example.com",
  "created_at": "2026-02-20T10:30:00Z"
}
```

**이유:**
- 201은 "새로운 리소스가 성공적으로 생성되었음"을 명확히 표현
- `Location` 헤더로 생성된 리소스 URL 제공
- 클라이언트가 바로 해당 URL로 리다이렉트 가능

**(2) 존재하지 않는 리소스 조회**

**상태 코드:** `404 Not Found`

```http
GET /api/users/999 HTTP/1.1

───────────────────────────────────────

HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "ID 999인 사용자를 찾을 수 없습니다.",
    "resource": "User",
    "id": 999
  }
}
```

**이유:**
- 404는 "요청한 리소스가 존재하지 않음"
- 클라이언트는 재시도할 필요 없음
- URL 오타나 이미 삭제된 리소스일 가능성

**주의:** 보안상 민감한 리소스는 404 대신 403 사용 가능
```
GET /api/admin/users/123
→ 403 Forbidden (존재 여부를 숨김)
```

**(3) 인증 토큰 만료**

**상태 코드:** `401 Unauthorized`

```http
GET /api/profile HTTP/1.1
Authorization: Bearer expired_token_abc123

───────────────────────────────────────

HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer realm="api", error="invalid_token", error_description="토큰이 만료되었습니다"
Content-Type: application/json

{
  "error": {
    "code": "TOKEN_EXPIRED",
    "message": "인증 토큰이 만료되었습니다. 다시 로그인해주세요.",
    "expired_at": "2026-02-20T10:00:00Z"
  }
}
```

**이유:**
- 401은 "인증 필요" (Authentication Required)
- 클라이언트는 자동으로 로그인 페이지로 리다이렉트
- Refresh Token으로 재발급 시도

**401 vs 403 차이:**
- **401 Unauthorized**: 인증이 안 됨 또는 만료 → 로그인 필요
- **403 Forbidden**: 인증은 됐지만 권한 없음 → 로그인해도 접근 불가

**(4) 서버 내부 오류**

**상태 코드:** `500 Internal Server Error`

```http
POST /api/orders HTTP/1.1

───────────────────────────────────────

HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    "request_id": "req_abc123xyz",
    "timestamp": "2026-02-20T10:30:00Z",
    "support_email": "support@example.com"
  }
}
```

**이유:**
- 500은 "서버 문제" (클라이언트는 문제 없음)
- 클라이언트는 재시도 가능 (Exponential Backoff)
- PM/개발팀은 즉시 대응 필요

**추가 정보:**
- `request_id`: 로그 추적용
- `timestamp`: 오류 발생 시각
- `support_email`: 사용자가 문의할 연락처

**절대 하지 말아야 할 것:**
```json
// ❌ 나쁜 예 - 스택 트레이스 노출
{
  "error": "NullPointerException at OrderService.java:42",
  "stack_trace": "java.lang.NullPointerException\n  at com.example..."
}
```
→ 보안 취약점 노출, 해커에게 정보 제공

**(5) 요청 횟수 제한 초과**

**상태 코드:** `429 Too Many Requests`

```http
GET /api/search?q=laptop HTTP/1.1

───────────────────────────────────────

HTTP/1.1 429 Too Many Requests
Retry-After: 60
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1708430100
Content-Type: application/json

{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "요청 횟수 제한을 초과했습니다. 60초 후 다시 시도해주세요.",
    "limit": 100,
    "window": "1시간",
    "retry_after": 60
  }
}
```

**이유:**
- 429는 "너무 많은 요청" (API 보호)
- `Retry-After`: 언제 재시도 가능한지 명시
- Rate Limit 헤더로 상태 제공

**클라이언트 구현:**
```javascript
const response = await fetch('/api/search?q=laptop');

if (response.status === 429) {
    const retryAfter = response.headers.get('Retry-After');
    console.log(`${retryAfter}초 후 재시도`);
    
    await sleep(retryAfter * 1000);
    // 재시도
}
```

**PM 관점:**
- Rate Limiting은 필수 (DDoS 방지, 공정적 사용)
- 티어별 제한 (Free: 100/시간, Pro: 1000/시간)
- 429 응답률을 모니터링 → 제한 조정 필요 여부 판단

---

**상태 코드 요약표:**

| 상태 코드 | 의미 | 재시도 | 사용자 조치 | PM 조치 |
|-----------|------|--------|-------------|---------|
| **201** | 생성 성공 | - | 없음 | - |
| **404** | 리소스 없음 | ❌ | URL 확인 | 링크 검증 |
| **401** | 인증 필요 | ❌ | 재로그인 | 세션 관리 |
| **500** | 서버 오류 | ✅ | 재시도/문의 | 긴급 수정 |
| **429** | 제한 초과 | ✅ (지연) | 잠시 대기 | 제한 조정 |

---

**8. REST API 설계 시 N+1 쿼리 문제가 발생하는 상황을 예시와 함께 설명하고, 이를 해결하기 위한 방법 3가지를 제시하세요. 또한 PM이 이 문제를 미리 방지하기 위해 요구사항 단계에서 고려해야 할 사항 2가지를 서술하세요.**

**모범 답안:**

**N+1 쿼리 문제란?**

**정의:** 
하나의 메인 쿼리 후, 결과의 각 항목마다 추가 쿼리를 실행하여 **N+1번의 DB 쿼리가 발생하는 성능 문제**

**문제 상황 예시:**

**시나리오:** 블로그 게시글 목록 API

```
GET /api/posts
→ 게시글 10개 조회, 각 게시글의 작성자 이름도 표시
```

**나쁜 구현 (N+1 발생):**

```python
# Step 1: 게시글 목록 조회 (1번의 쿼리)
posts = db.query("SELECT * FROM posts LIMIT 10")
# 결과: 10개 게시글 [{id: 1, user_id: 101, content: "..."}, ...]

# Step 2: 각 게시글의 작성자 조회 (N번의 쿼리)
for post in posts:
    user = db.query(f"SELECT name FROM users WHERE id = {post['user_id']}")
    post['user_name'] = user['name']

# 총 쿼리 수: 1 + 10 = 11번
# 게시글이 100개면? 1 + 100 = 101번!
```

**성능 영향:**

```
쿼리 1회 평균 10ms 가정:
- 11번 쿼리 = 110ms
- 101번 쿼리 = 1010ms (1초 이상!)

DB 연결 오버헤드 포함 시:
- 101번 쿼리 = 1.5~2초
```

**실제 프로젝트 사례:**

**이커머스 주문 목록 API:**
```
GET /api/orders
→ 주문 100개
→ 각 주문의 사용자 정보 (100번)
→ 각 주문의 배송 정보 (100번)
→ 각 주문의 상품 목록 (평균 3개) (300번)
─────────────────────────────────────
총 쿼리: 1 + 100 + 100 + 300 = 501번
응답 시간: 5~10초 (타임아웃!)
```

---

**해결 방법:**

**방법 1: Eager Loading (즉시 로딩) - JOIN 사용**

**개선된 구현:**

```python
# 단일 쿼리로 모든 데이터 조회
query = """
SELECT 
    p.id, p.content, p.created_at,
    u.id as user_id, u.name as user_name, u.email as user_email
FROM posts p
LEFT JOIN users u ON p.user_id = u.id
LIMIT 10
"""

posts = db.query(query)

# 총 쿼리 수: 1번 (91% 감소!)
```

**ORM 사용 예시 (SQLAlchemy):**

```python
# 나쁜 예 (N+1 발생)
posts = session.query(Post).limit(10).all()
for post in posts:
    print(post.user.name)  # 각 게시글마다 쿼리 실행

# 좋은 예 (Eager Loading)
posts = session.query(Post).options(
    joinedload(Post.user)  # 즉시 로딩
).limit(10).all()

for post in posts:
    print(post.user.name)  # 추가 쿼리 없음
```

**장점:**
- 단일 쿼리로 모든 데이터 조회
- 응답 시간 10~20배 개선
- DB 부하 감소

**단점:**
- JOIN이 많으면 복잡한 쿼리
- 데이터 중복 (1:N 관계)
  - 게시글 1개에 댓글 10개면 게시글 데이터가 10번 반복

**방법 2: Batch Loading (일괄 로딩) - IN 쿼리**

**구현:**

```python
# Step 1: 게시글 조회 (1번)
posts = db.query("SELECT * FROM posts LIMIT 10")
# 결과: [{id: 1, user_id: 101}, {id: 2, user_id: 102}, ...]

# Step 2: 모든 user_id 추출
user_ids = [post['user_id'] for post in posts]  # [101, 102, 103, ...]

# Step 3: 한 번에 모든 사용자 조회 (1번)
users = db.query(f"SELECT id, name FROM users WHERE id IN ({','.join(map(str, user_ids))})")
# 결과: {101: 'Alice', 102: 'Bob', ...}

# Step 4: 매핑
user_map = {user['id']: user for user in users}
for post in posts:
    post['user_name'] = user_map[post['user_id']]['name']

# 총 쿼리 수: 1 + 1 = 2번 (82% 감소!)
```

**GraphQL DataLoader 예시:**

```javascript
// DataLoader가 자동으로 Batch Loading 수행
const userLoader = new DataLoader(async (userIds) => {
    const users = await db.query('SELECT * FROM users WHERE id IN (?)', [userIds]);
    return userIds.map(id => users.find(u => u.id === id));
});

// 100개 게시글을 순회해도 단 1번의 IN 쿼리만 실행
for (const post of posts) {
    post.user = await userLoader.load(post.user_id);
}
```

**장점:**
- JOIN보다 단순
- 데이터 중복 없음
- 캐싱과 조합하기 좋음

**단점:**
- IN 쿼리의 항목이 너무 많으면 (수천 개) 성능 저하
- 여전히 2번의 쿼리 필요

**방법 3: API 응답 구조 변경 (Nested Resources)**

**기존 구조 (Flat):**

```json
GET /api/posts

[
  {
    "id": 1,
    "content": "...",
    "user_id": 101,
    "user_name": "Alice",      // N+1 발생 원인
    "user_email": "alice@..."  // N+1 발생 원인
  },
  ...
]
```

**개선된 구조 (Nested):**

```json
GET /api/posts?include=user

[
  {
    "id": 1,
    "content": "...",
    "user": {               // 중첩 객체
      "id": 101,
      "name": "Alice",
      "email": "alice@..."
    }
  },
  ...
]
```

**또는 정규화된 응답:**

```json
{
  "posts": [
    {"id": 1, "content": "...", "user_id": 101},
    {"id": 2, "content": "...", "user_id": 102}
  ],
  "users": {
    "101": {"id": 101, "name": "Alice"},
    "102": {"id": 102, "name": "Bob"}
  }
}
```

**클라이언트에서 조합:**
```javascript
const posts = response.posts.map(post => ({
    ...post,
    user: response.users[post.user_id]
}));
```

**장점:**
- 데이터 중복 최소화
- 캐싱 효율 극대화
- Redux Normalized State와 호환

**`include` 파라미터 지원:**

```python
GET /api/posts?include=user,comments,tags

# include가 있을 때만 JOIN/Batch Loading 수행
if 'user' in request.args.get('include', '').split(','):
    posts = session.query(Post).options(joinedload(Post.user)).all()
else:
    posts = session.query(Post).all()
```

**장점:**
- 클라이언트가 필요한 데이터만 요청
- Over-fetching 방지
- 유연성

---

**PM이 요구사항 단계에서 고려해야 할 사항:**

**1) API 응답 스펙 명확히 정의 (Include 전략)**

**문제 상황:**
```
요구사항: "주문 목록을 보여주세요"

개발자 해석:
- 주문 ID, 날짜, 금액만? (간단)
- 주문 + 사용자 정보? (N+1 발생 가능)
- 주문 + 사용자 + 상품 + 배송? (N+1 폭발)
```

**PM의 명확한 요구사항 문서:**

```markdown
# 주문 목록 API (/api/orders)

## 화면 요구사항
- 주문 번호, 주문 날짜, 총 금액
- 주문자 이름, 이메일 (사용자 정보)
- 배송 상태
- 주문 상품 개수 (목록 아님)

## API 응답 스펙
```json
{
  "orders": [
    {
      "id": 1,
      "date": "2026-02-20",
      "total": 50000,
      "user": {              // ← 명시: user 정보 포함
        "name": "김철수",
        "email": "kim@..."
      },
      "shipping_status": "배송중",
      "items_count": 3       // ← 명시: 개수만 (상세는 별도 API)
    }
  ]
}
```

## 성능 요구사항
- 응답 시간: 200ms 이하
- 목록 크기: 기본 20개, 최대 100개
- 페이지네이션: Cursor 방식

## 확장성
- 향후 "주문 상품 목록"은 별도 API로 제공
  GET /api/orders/{id}/items
```

**개발팀과의 협의:**
```
PM: "이 화면에서 사용자 정보가 꼭 필요한가요?"
Designer: "네, 이름은 필수입니다."
PM: "이메일도요?"
Designer: "이메일은 hover 시만 표시합니다."

→ 결정: `include=user.name` (이메일은 제외)
→ JOIN 복잡도 감소
```

**2) 데이터 로딩 전략 및 페이지네이션**

**문제 상황:**
```
요구사항: "관리자 페이지에서 전체 사용자 목록 표시"

개발자가 구현:
SELECT * FROM users;  # 100만 명 조회
→ 메모리 부족, 타임아웃
```

**PM의 명확한 정의:**

```markdown
# 사용자 관리 페이지

## 데이터 로딩
- **기본 20명씩 페이징**
- 무한 스크롤
- 초기 로딩 시간 < 500ms

## 검색/필터
- 이름, 이메일로 검색
- 가입 날짜 필터
- 상태 필터 (활성/비활성)

## 상세 정보 로딩
- 목록: 사용자 기본 정보만 (이름, 이메일, 가입일)
- 클릭 시: 상세 정보 별도 로딩 (주문 내역, 활동 로그)
  GET /api/users/{id}/details
```

**Lazy Loading vs Eager Loading 결정:**

| 데이터 | 로딩 전략 | 이유 |
|--------|----------|------|
| 사용자 기본 정보 | Eager | 항상 필요 |
| 사용자 프로필 이미지 URL | Eager | 가벼움 |
| 주문 내역 | Lazy | 클릭 시에만 필요, 무거움 |
| 활동 로그 | Lazy | 관리자만 가끔 확인 |

**개발팀에게 제공:**
```
"사용자 목록은 이름, 이메일, 가입일만 표시하면 됩니다.
주문 내역은 사용자를 클릭했을 때 별도로 로딩하세요.
전체 사용자를 한 번에 불러오지 마세요. 페이징 필수입니다."
```

**성능 목표 명시:**
```
- 20명 목록 조회: < 200ms
- 사용자 상세 (주문 내역 포함): < 500ms
- 검색 결과: < 300ms

→ 개발팀은 이 목표를 달성하기 위해 N+1 문제 등을 해결
```

**추가 고려사항:**

**3) Caching 전략 (보너스)**

```markdown
# 캐싱 정책

## 캐시 대상
- 사용자 프로필: Redis, TTL 5분
- 상품 카탈로그: CDN, TTL 1시간
- 주문 내역: 캐시 안 함 (실시간 데이터)

## 캐시 무효화
- 사용자 정보 변경 시: 해당 사용자 캐시 삭제
- 배포 시: 전체 캐시 Warm-up
```

**4) 부하 테스트 요구사항**

```markdown
# 성능 테스트 시나리오

## 부하 조건
- 동시 사용자: 1000명
- 요청률: 초당 100 req/s
- 데이터: 사용자 10만 명, 주문 100만 건

## 목표
- 응답 시간 P95: 300ms
- 응답 시간 P99: 500ms
- 에러율: < 0.1%

→ 개발팀은 이를 위해 N+1 문제, 인덱스 최적화 등 수행
```

---

**PM 체크리스트 (요구사항 단계):**

- [ ] API 응답에 필요한 필드를 명확히 정의했는가?
- [ ] 불필요한 필드는 제외했는가?
- [ ] 페이지네이션 전략을 결정했는가?
- [ ] Lazy Loading vs Eager Loading 구분했는가?
- [ ] 성능 목표 (응답 시간)를 명시했는가?
- [ ] 부하 테스트 시나리오를 정의했는가?
- [ ] 캐싱이 필요한 데이터를 식별했는가?
- [ ] 개발팀과 API 스펙을 리뷰했는가?

**결과:**
- 개발자가 명확한 가이드를 갖고 최적화된 쿼리 작성
- N+1 문제 사전 방지
- 성능 이슈 최소화
- 프로젝트 일정 준수

---

### 4교시 요약

**핵심 개념:**
1. **DNS**: 도메인 → IP 변환, 계층 구조 (Root → TLD → Authoritative)
2. **DNS 레코드**: A (IPv4), AAAA (IPv6), CNAME (별칭), MX (메일), NS (네임서버)
3. **HTTP 메서드**: GET (조회), POST (생성), PUT (전체 수정), PATCH (부분 수정), DELETE (삭제)
4. **HTTP 상태 코드**: 2xx (성공), 4xx (클라이언트 오류), 5xx (서버 오류)
5. **REST API**: 리소스 중심, HTTP 메서드 활용, 상태 코드 올바른 사용

**PM 관점:**
- DNS 장애는 서비스 전체 중단 → 멀티 DNS, 낮은 TTL
- HTTP 상태 코드는 모니터링 및 자동화의 기반
- RESTful 설계는 팀 간 협업 및 외부 통합 효율성 향상
- N+1 문제는 성능에 치명적 → 요구사항 단계에서 방지
- API 문서는 계약서 → 명확하고 상세하게

---

## 5교시: 네트워크 장비 및 인프라 (이론 + 예시 + 실습 + 퀴즈)

### 이론 (50분)

#### 1. 네트워크 장비

**A. 허브 (Hub)**

**정의:**
여러 장치를 물리적으로 연결하는 **가장 단순한 네트워크 장비** (OSI Layer 1 - 물리 계층)

**동작 방식:**
- 한 포트로 들어온 신호를 **모든 포트로 브로드캐스트**
- 목적지 구분 없이 무조건 전달
- **Half-Duplex**: 동시에 송수신 불가

**예시:**
```
[PC A] ─┐
         │
[PC B] ─┤── [HUB] (8-port)
         │
[PC C] ─┘

PC A가 PC B에게 데이터 전송
→ Hub는 모든 포트 (A, B, C)로 전송
→ B만 받아들이고, C는 무시
```

**문제점:**

**1) 충돌 (Collision)**
- 여러 장치가 동시에 전송하면 신호 충돌
- CSMA/CD (Carrier Sense Multiple Access with Collision Detection) 필요
- 재전송으로 인한 성능 저하

**2) 보안 취약**
- 모든 데이터가 모든 포트로 전송
- 패킷 스니핑(Sniffing)으로 도청 가능

**3) 대역폭 공유**
- 100Mbps Hub를 8대가 공유 → 실제 12.5Mbps/대
- Scale이 안 됨

**현재 사용:**
- **거의 사용 안 함** (스위치로 대체)
- 교육용 또는 레거시 시스템

**PM이 알아야 할 점:**
- 신규 프로젝트에서는 절대 사용 금지
- 레거시 환경에서 발견 시 교체 권장
- "Hub 사용 중"이라는 말은 "매우 구식 인프라"를 의미

**B. 스위치 (Switch)**

**정의:**
MAC 주소를 기반으로 **지능적으로 데이터를 전달**하는 네트워크 장비 (OSI Layer 2 - 데이터 링크 계층)

**동작 방식:**

**1) MAC 주소 학습 (Learning)**
- 각 포트에 연결된 장치의 MAC 주소를 학습
- MAC Address Table (CAM Table) 생성

```
Port | MAC Address
-----|------------------
1    | 00:1A:2B:3C:4D:5E (PC A)
2    | 00:1A:2B:3C:4D:5F (PC B)
3    | 00:1A:2B:3C:4D:60 (PC C)
```

**2) 선택적 전달 (Forwarding)**
- 목적지 MAC 주소를 보고 해당 포트로만 전송
- 불필요한 트래픽 차단

**예시:**
```
[PC A] ─┐ Port 1
         │
[PC B] ─┤ Port 2 ── [Switch] (8-port)
         │
[PC C] ─┘ Port 3

PC A가 PC B에게 데이터 전송
→ Switch는 MAC Table 확인
→ Port 2로만 전송
→ PC C에는 전송 안 함 (보안 향상)
```

**3) Full-Duplex**
- 동시 송수신 가능
- 충돌 없음

**장점:**

**1) 성능 향상**
- 각 포트가 독립적인 대역폭 보유
- 100Mbps Switch, 8-port → 각 포트 100Mbps (총 800Mbps 처리 가능)

**2) 충돌 감소**
- 각 포트가 독립적인 Collision Domain
- CSMA/CD 거의 불필요

**3) 보안 향상**
- 목적지 포트로만 전송
- 스니핑 어려움 (불가능하지는 않음 - ARP Spoofing 등)

**스위치 종류:**

**1) Unmanaged Switch (비관리형)**
- 설정 불가, 꽂으면 바로 동작
- 가정용, 소규모 사무실
- 저렴 ($30~$100)

**2) Managed Switch (관리형)**
- 웹/CLI를 통한 설정 가능
- VLAN, QoS, Port Mirroring 등 지원
- 기업용
- 고가 ($200~$5,000+)

**주요 기능:**

**VLAN (Virtual LAN):**
```
Physical Switch (24-port)
│
├─ VLAN 10 (개발팀): Port 1-8
├─ VLAN 20 (영업팀): Port 9-16
└─ VLAN 30 (서버):   Port 17-24

→ 물리적으로는 하나의 스위치지만
   논리적으로는 3개의 분리된 네트워크
→ VLAN 간 통신은 라우터 필요
```

**Port Mirroring (패킷 캡처):**
```
Port 1 (웹 서버) → Port 10 (모니터링 서버)로 복제
→ 트래픽 분석, IDS 연동
```

**Link Aggregation (본딩):**
```
Switch A <─(1Gbps)─> Switch B
         <─(1Gbps)─>
         <─(1Gbps)─>
         <─(1Gbps)─>
→ 총 4Gbps 대역폭 + 이중화
```

**PM 고려사항:**
- 프로젝트 인프라에서 Managed Switch 권장
- VLAN으로 부서/서비스 분리 (보안)
- 스위치 용량 산정: 포트 수, 대역폭, PoE 필요 여부

**C. 라우터 (Router)**

**정의:**
**IP 주소를 기반으로** 서로 다른 네트워크 간 데이터를 전달하는 장비 (OSI Layer 3 - 네트워크 계층)

**역할:**

**1) 경로 결정 (Routing)**
- 목적지 IP 주소로 최적 경로 선택
- Routing Table 사용

**Routing Table 예시:**
```
Destination      Gateway         Interface  Metric
0.0.0.0/0        203.0.113.1     eth0       1       (기본 경로 - 인터넷)
192.168.1.0/24   0.0.0.0         eth1       0       (내부 LAN)
10.0.0.0/8       10.0.0.1        eth2       0       (본사 네트워크)
172.16.0.0/12    172.16.0.1      eth3       10      (지사 WAN)
```

**2) 네트워크 분리**
- LAN과 WAN 연결
- 서브넷 간 통신 중개

**예시:**
```
     [인터넷]
         │
    [Router] (공인 IP: 203.0.113.50)
         │
    ─────┴─────────────────
    │                      │
[LAN 1]                [LAN 2]
192.168.1.0/24         192.168.2.0/24
개발팀                  영업팀
    │                      │
  Switch                 Switch
```

**동작 예시:**

**시나리오:** 192.168.1.10 (개발팀 PC)이 8.8.8.8 (Google DNS)에 패킷 전송

```
1. PC: "8.8.8.8은 내 네트워크가 아니네" → 기본 게이트웨이(192.168.1.1)로 전송
2. Router: Routing Table 확인 → 0.0.0.0/0 (기본 경로) → 인터넷으로 전송
3. ISP Router: 경로 결정 → Google 네트워크로 전달
...
n. 응답 패킷 역순으로 돌아옴
```

**3) NAT (Network Address Translation)**

**목적:** 사설 IP를 공인 IP로 변환

**예시:**
```
내부 (사설 IP)                  외부 (공인 IP)
192.168.1.10:54321  ─────>  203.0.113.50:12345 ────> 8.8.8.8:53
                    Router NAT

NAT Table:
Internal           External            Destination
192.168.1.10:54321 → 203.0.113.50:12345 → 8.8.8.8:53
192.168.1.20:54322 → 203.0.113.50:12346 → 1.1.1.1:53
```

**장점:**
- IP 주소 절약 (수백 대가 하나의 공인 IP 공유)
- 보안 (내부 구조 숨김)

**단점:**
- 공인 IP로 외부에서 직접 접근 불가 (Port Forwarding 필요)
- 일부 P2P 프로토콜 동작 안 함

**4) 방화벽 기능 (기본)**
- Access Control List (ACL)
- 특정 IP/포트 차단

**라우터 종류:**

**1) 가정용 공유기 (Wireless Router)**
- 라우터 + 스위치 + Wi-Fi AP 통합
- NAT, DHCP, 기본 방화벽
- 저렴 ($30~$200)

**2) 기업용 라우터 (Enterprise Router)**
- 고성능, 다양한 라우팅 프로토콜
- Cisco, Juniper 등
- 고가 ($2,000~$50,000+)

**3) 코어 라우터 (Core Router)**
- ISP, 대규모 데이터센터
- 초고속 (100Gbps+)
- 초고가 ($100,000+)

**라우팅 프로토콜:**

**정적 라우팅 (Static Routing):**
- 수동으로 경로 설정
- 소규모 네트워크에 적합
- 변경 시 직접 수정

**동적 라우팅 (Dynamic Routing):**
- 자동으로 경로 학습 및 업데이트
- 대규모 네트워크, 장애 대응
- 프로토콜: RIP, OSPF, BGP

**PM 관점:**
- 라우터는 네트워크의 핵심 장비
- 용량 산정: 트래픽양, 동시 세션 수
- 이중화 필수 (단일 장애점)
- VPN, QoS 등 고급 기능 필요 시 고려

**Hub vs Switch vs Router 비교표:**

| 구분 | Hub | Switch | Router |
|------|-----|--------|--------|
| **OSI Layer** | 1 (물리) | 2 (데이터링크) | 3 (네트워크) |
| **주소 기반** | 없음 | MAC 주소 | IP 주소 |
| **전달 방식** | 브로드캐스트 (모든 포트) | 선택적 (목적지 포트만) | 경로 결정 (최적 경로) |
| **충돌** | 많음 | 없음 | 없음 |
| **보안** | 매우 취약 | 중간 | 높음 |
| **네트워크 분리** | 불가 | VLAN 가능 | 가능 (필수 기능) |
| **속도** | 느림 | 빠름 | 중간 (처리 overhead) |
| **용도** | 구식 | LAN 내부 | LAN-WAN 연결 |
| **가격** | 저렴 | 중간 | 고가 |
| **현재 사용** | 거의 없음 | 대부분 | 필수 |

### 예시 (25분)

<details>
<summary>📋 예시 1: 스위치 교체로 네트워크 병목 해소 - 제조업 MES 프로젝트</summary>

**상황:**
스마트 팩토리 MES(Manufacturing Execution System) 구축 프로젝트. 생산 라인의 PLC, 센서, 작업자 단말 100여 대가 구형 허브(Hub)로 연결되어 있음.

**증상:**
- 생산 데이터 전송 지연 500ms 이상
- 주기적인 패킷 충돌로 데이터 유실
- 피크 타임(교대 시간) 시스템 응답 불가

**PM이 받은 보고:**
> "네트워크가 느려서 MES 데이터가 제대로 안 들어옵니다. 생산 현황판이 5분씩 밀립니다."

**원인 분석:**

```
[구 구성 - 허브 기반]
PLC × 30대 ──┐
센서 × 40대 ──┼── Hub ── 서버
단말 × 30대 ──┘

허브 특성: 브로드캐스트 → 모든 장비가 동시에 패킷을 "듣고" 충돌 발생
→ CSMA/CD로 재전송 반복 → 대역폭 실질적 1/N으로 감소
```

**해결책 - 스위치로 교체:**

```
[신 구성 - 스위치 기반]
PLC × 30대 ──┐
센서 × 40대 ──┼── L2 Switch (포트당 전용 대역폭) ── L3 Switch ── 서버
단말 × 30대 ──┘

스위치 특성: 유니캐스트 → 목적지 포트에만 전달 → 충돌 없음
→ VLAN으로 PLC/센서/단말 트래픽 분리 → 우선순위 QoS 적용
```

**PM의 역할:**

| 단계 | PM 활동 |
|------|---------|
| 문제 인식 | 증상(느림)을 원인(허브→충돌)으로 번역 |
| 해결책 정의 | L2/L3 스위치 교체 + VLAN 설계 요구사항 문서화 |
| 예산 확보 | 스위치 교체 비용 vs 생산 지연 손실 비용 비교 제시 |
| 리스크 관리 | 교체 중 생산 중단 최소화 → 야간 작업 계획 |
| 검수 기준 | 전송 지연 < 10ms, 패킷 손실률 < 0.01% |

**결과:**
- 데이터 전송 지연: 500ms → 3ms (166배 개선)
- 패킷 충돌 발생: 0건
- 생산 현황판 실시간 반영 달성

</details>

---

<details>
<summary>📋 예시 2: 로드 밸런서 도입으로 서비스 안정화 - 금융 뱅킹 앱</summary>

**상황:**
모바일 뱅킹 앱 고도화 프로젝트. 기존 단일 웹 서버 구성에서 트래픽 급증 시 장애 반복.

**증상:**
- 월급날(25일), 명절 전날 트래픽 5배 급증 시 서버 다운
- 응답 시간 평균 200ms → 피크 시 30초 이상
- 연간 4회 이상 서비스 중단 → 금융감독원 경고

**PM의 인프라 개선 요구사항 정의:**

```
[개선 전]
사용자 → 단일 Web Server (Apache) → DB Server

[개선 후]
사용자 → L4 Load Balancer
           ├── Web Server 1 (Active)
           ├── Web Server 2 (Active)
           └── Web Server 3 (Standby)
                      ↓
              DB Server (Primary + Replica)
```

**로드 밸런서 알고리즘 선택:**

| 알고리즘 | 설명 | 적합한 경우 |
|---------|------|------------|
| Round Robin | 순서대로 분배 | 서버 성능 동일 |
| Least Connection | 연결 수 적은 서버로 | 처리 시간 다양 |
| IP Hash | 클라이언트 IP 기반 | 세션 유지 필요 |
| **Weighted** | **성능 비례 분배** | **서버 사양 다를 때** |

> 이 프로젝트는 세션 유지(로그인 상태) 필요 → IP Hash 방식 채택

**PM의 SLA 정의:**
```
가용성: 99.95% 이상 (연간 다운타임 4.38시간 이내)
응답 시간: 평균 200ms 이내, 95th percentile 500ms 이내
동시 접속: 최대 50,000명 처리
```

**결과:**
- 서비스 중단: 연 4회 → 0회
- 피크 시 응답 시간: 30초 → 180ms
- 금융감독원 IT 안전성 평가 우수 등급 획득

**PM 학습 포인트:**
> 성능 문제는 단순히 "서버 사양 업그레이드"가 아닌 아키텍처 개선으로 해결되는 경우가 많다. PM은 기술팀의 설계 결정이 비즈니스 SLA를 만족하는지 검증해야 한다.

</details>

---

<details>
<summary>📋 예시 3: VPN 게이트웨이 구축으로 재택근무 인프라 지원 - IT 컨설팅사</summary>

**상황:**
COVID-19 이후 재택근무 전환 프로젝트. 300명 직원 전원 재택 가능 인프라 필요.

**요구사항:**
- 사내 시스템(ERP, 프로젝트 관리도구, NAS) 외부 접근
- 보안 수준 유지 (내부망과 동일 수준)
- IT 비용 최소화

**VPN 구성 설계:**

```
[재택근무 연결 구조]

재택 PC ──[인터넷]── VPN Gateway ──[내부망]── ERP/NAS/협업도구
         암호화 터널                           
         (AES-256)    방화벽에서
                      인증된 사용자만 허용
```

**VPN 방식 비교 (PM이 이해해야 할 내용):**

| 구분 | SSL VPN | IPSec VPN |
|------|---------|-----------|
| 설정 | 쉬움 (브라우저) | 복잡 (클라이언트 설치) |
| 속도 | 보통 | 빠름 |
| 보안 | 높음 | 매우 높음 |
| 비용 | 저렴 | 고가 |
| **채택** | **일반 직원** | **개발자/관리자** |

**PM의 구현 계획:**

| 단계 | 내용 | 기간 |
|------|------|------|
| 1단계 | VPN 게이트웨이 장비 조달 및 설치 | 2주 |
| 2단계 | 사용자 인증 체계 구축 (MFA 연동) | 1주 |
| 3단계 | 파일럿 테스트 (IT 부서 30명) | 1주 |
| 4단계 | 전사 롤아웃 (300명, 부서별 순차) | 2주 |
| 5단계 | 모니터링 체계 구축 | 1주 |

**리스크 및 대응:**

| 리스크 | 대응 방안 |
|--------|-----------|
| VPN 병목 (트래픽 집중) | Split Tunneling: 사내 트래픽만 VPN, 일반 인터넷은 직접 연결 |
| 보안 단말 미확인 | 단말 인증서 + MDM 연동 |
| 사용법 복잡 | 온보딩 가이드 + 헬프데스크 운영 |

**결과:**
- 전 직원 재택근무 3주 만에 완료
- VPN 연결 성공률 99.2%
- 보안 사고 0건

</details>

---

### 실습 (20분)

#### 실습 1: 사무실 네트워크 설계

**시나리오:**
신규 사무실(5층 건물, 층당 50명, 총 250명) 네트워크 인프라를 설계하라.

**요구사항:**
- 부서별 네트워크 분리 (영업, 개발, 재무, HR, 임원)
- 인터넷 회선 이중화
- 서버실(3층) 중심의 스타 토폴로지

**작업 내용:**

**① 필요 장비 목록 작성:**

| 장비 | 수량 | 위치 | 목적 |
|------|------|------|------|
| 코어 스위치 (L3) | ___ | 서버실 | |
| 액세스 스위치 (L2) | ___ | 각 층 | |
| 라우터 | ___ | 서버실 | |
| AP (무선) | ___ | 각 층 분산 | |
| 방화벽 | ___ | DMZ | |

**② VLAN 설계:**

| VLAN ID | 부서 | IP 대역 | 인원 |
|---------|------|---------|------|
| VLAN 10 | 영업 | 192.168.10.0/24 | 60명 |
| VLAN 20 | 개발 | | 80명 |
| VLAN 30 | 재무 | | 30명 |
| VLAN 40 | HR | | 20명 |
| VLAN 50 | 임원 | | 10명 |
| VLAN 99 | 서버 | | - |

**③ 대역폭 계산:**
- 1인당 평균 사용 대역폭: 10Mbps
- 동시 접속률: 80%
- 필요 총 대역폭: ___Mbps

**정답:**
<details>
<summary>정답 확인</summary>

**① 장비 목록:**
- 코어 스위치 (L3): 2대 (이중화), 서버실
- 액세스 스위치 (L2): 10대 (층당 2대, 5층), 각 층 배선반
- 라우터: 2대 (이중화), 서버실 (ISP 연결)
- AP: 25대 (층당 5대, 20명당 1AP 기준)
- 방화벽: 2대 (Active-Standby), DMZ 구간

**② VLAN 20 개발:** 192.168.20.0/24
**VLAN 30 재무:** 192.168.30.0/24 (금융 규정상 별도 분리 필수)
**VLAN 40 HR:** 192.168.40.0/24 (개인정보 보호)
**VLAN 50 임원:** 192.168.50.0/24

**③ 대역폭:** 250 × 10Mbps × 0.8 = 2,000Mbps = **2Gbps**
→ 2Gbps 인터넷 회선 × 2 (이중화) 권장

</details>

---

#### 실습 2: 장비 선정 의사결정 매트릭스

**시나리오:**
중소기업(직원 100명)의 네트워크 장비 교체 예산 2,000만원. 다음 중 최적 구성을 선택하라.

**옵션 A - 클라우드 SD-WAN:**
- 비용: 월 150만원 (3년 총 5,400만원)
- 관리: 클라우드 콘솔로 원격 관리
- 성능: 동적 경로 최적화
- 초기비용: 500만원

**옵션 B - 온프레미스 라우터/스위치:**
- 비용: 초기 1,800만원 (3년 유지보수 600만원)
- 관리: 현장 직접 관리
- 성능: 고정 성능, 안정적
- 초기비용: 1,800만원

**옵션 C - 하이브리드 (스위치 온프레미스 + SD-WAN 에지):**
- 비용: 초기 1,200만원 + 월 80만원
- 관리: 혼합
- 성능: 유연성 + 안정성 균형

**평가 기준으로 점수 매기기 (각 항목 5점 만점):**

| 평가 항목 | 가중치 | 옵션 A | 옵션 B | 옵션 C |
|-----------|--------|--------|--------|--------|
| 초기 비용 부담 | 30% | | | |
| 3년 총 비용 | 20% | | | |
| 관리 편의성 | 20% | | | |
| 성능/안정성 | 20% | | | |
| 확장성 | 10% | | | |
| **가중 합계** | | | | |

**정답:**
<details>
<summary>정답 확인</summary>

| 평가 항목 | 가중치 | 옵션 A | 옵션 B | 옵션 C |
|-----------|--------|--------|--------|--------|
| 초기 비용 부담 | 30% | 5 (500만) | 1 (1800만) | 4 (1200만) |
| 3년 총 비용 | 20% | 1 (5900만) | 4 (2400만) | 3 (4080만) |
| 관리 편의성 | 20% | 5 (원격) | 2 (현장) | 4 (혼합) |
| 성능/안정성 | 20% | 4 (동적) | 5 (안정) | 4 (균형) |
| 확장성 | 10% | 5 (클라우드) | 2 (물리적 한계) | 4 |
| **가중 합계** | | **3.8** | **2.9** | **3.8** |

→ 단순 점수는 A=C이나, **예산 2,000만원 제약** 고려 시 옵션 C 추천
→ SD-WAN 에지는 추후 완전 전환 가능 (단계적 투자)

**PM 포인트:** 기술 평가에 재무적 관점을 결합한 의사결정 매트릭스가 핵심.

</details>

---

#### 실습 3: 장애 시나리오 대응 계획

**시나리오:**
오전 9시, 영업팀(50명)이 사내 CRM 시스템에 접속 불가. 고객 상담 업무 마비.

**네트워크 구성:**
```
영업팀 PC → [L2 Switch-03] → [Core Switch] → [Firewall] → [Server]
```

**보고 내용:**
- 영업팀 전체 인터넷도 안됨
- 타 부서(개발, 재무)는 정상
- 어제 야간에 스위치실 에어컨 수리 공사 있었음

**OSI 7계층 기반 장애 추적 (아래를 채우세요):**

| 계층 | 확인 항목 | 확인 방법 | 예상 원인 |
|------|-----------|-----------|-----------|
| 1계층 (물리) | 케이블, LED | 현장 육안 | |
| 2계층 (데이터링크) | MAC 테이블, VLAN | show mac-address-table | |
| 3계층 (네트워크) | IP, 라우팅 | ping, traceroute | |
| 7계층 (응용) | 서버 상태 | 서버 로그 | |

**정답:**
<details>
<summary>정답 확인</summary>

**실제 원인:** 에어컨 수리 중 케이블 재연결 시 Switch-03의 업링크 케이블이 잘못 연결됨 (1계층 문제)

**확인 순서:**
1. **1계층:** Switch-03 LED 확인 → 업링크 포트 LED 꺼짐 발견
2. **원인:** 케이블 탈락 또는 잘못된 포트에 연결

**PM 조치:**
- 즉시: IT팀 현장 파견 → 케이블 재연결 (10분 해결)
- 사후: 공사 후 네트워크 점검 체크리스트 의무화
- 재발 방지: 네트워크실 공사 시 IT팀 동행 프로세스 수립

**교훈:** 복잡한 장애도 1계층(물리)에서 원인을 찾는 경우가 30% 이상. 항상 Physical → Logical 순서로 확인.

</details>

---

### 퀴즈 (15분)

#### 객관식 (각 5점, 총 25점)

**문제 1.** 다음 중 네트워크 장비의 특성이 올바르게 연결된 것은?

① 허브 - 유니캐스트 방식으로 목적지 포트에만 전달  
② 스위치 - 브로드캐스트로 모든 포트에 전달  
③ 라우터 - MAC 주소 기반으로 경로를 결정  
④ 스위치 - MAC 주소 테이블을 유지하며 선택적 전달  

<details><summary>정답</summary>④ - 스위치는 MAC 주소 테이블을 학습하고 유지하여 목적지 MAC 주소에 해당하는 포트에만 프레임을 전달한다.</details>

---

**문제 2.** 다음 중 로드 밸런서의 역할로 가장 적절한 것은?

① 외부 공격으로부터 내부 네트워크를 보호  
② 여러 서버에 트래픽을 분산하여 가용성과 성능 향상  
③ IP 주소를 도메인 이름으로 변환  
④ 내부 네트워크와 외부 인터넷을 연결  

<details><summary>정답</summary>② - 로드 밸런서는 복수의 서버에 트래픽을 분산하여 단일 장애점(SPOF)을 제거하고 성능을 향상시킨다.</details>

---

**문제 3.** VPN(Virtual Private Network)의 주요 기능에 해당하지 않는 것은?

① 공중망을 통한 암호화 터널 생성  
② 원격 사용자의 내부망 접속 허용  
③ 네트워크 트래픽 부하 분산  
④ 지사 간 사설망처럼 연결  

<details><summary>정답</summary>③ - 트래픽 부하 분산은 로드 밸런서의 기능이다. VPN은 보안 터널 생성, 원격 접근, 지사 연결이 주요 기능이다.</details>

---

**문제 4.** VLAN(Virtual LAN)을 사용하는 가장 큰 이유는?

① 인터넷 속도 향상  
② 물리적으로 다른 스위치의 포트들을 하나의 논리적 네트워크로 묶거나 분리  
③ 무선 신호 강도 향상  
④ 서버 처리 속도 향상  

<details><summary>정답</summary>② - VLAN은 물리적 위치와 무관하게 논리적으로 네트워크를 분리/통합하여 보안과 관리 효율성을 높인다.</details>

---

**문제 5.** PM이 네트워크 장비 조달 시 가장 먼저 고려해야 할 사항은?

① 장비 브랜드 인지도  
② 현재 트래픽 요구사항 및 향후 3~5년 성장 예측  
③ 장비 색상 및 디자인  
④ 납품업체의 영업 담당자 친밀도  

<details><summary>정답</summary>② - 현재 요구사항뿐 아니라 성장을 고려한 적절한 용량(capacity planning)이 장비 선정의 핵심 기준이다.</details>

---

#### 주관식 (각 15점, 총 45점)

**문제 6.** (15점)
스위치와 라우터의 차이를 **OSI 계층, 동작 원리, 주요 용도** 측면에서 비교하여 설명하고, PM이 네트워크 인프라 설계 시 두 장비의 역할을 구분해야 하는 이유를 서술하시오.

<details>
<summary>모범 답안</summary>

**비교:**

| 구분 | 스위치 | 라우터 |
|------|--------|--------|
| OSI 계층 | 2계층 (데이터링크) | 3계층 (네트워크) |
| 동작 원리 | MAC 주소 기반 프레임 전달 | IP 주소 기반 패킷 경로 선택 |
| 주요 용도 | LAN 내부 장비 연결 | 네트워크 간 연결 (LAN-WAN, LAN-인터넷) |
| 브로드캐스트 | 동일 세그먼트 내 전달 | 브로드캐스트 도메인 분리 |

**PM이 구분해야 하는 이유:**
1. **비용 구조 차이:** 라우터는 스위치보다 고가이므로, 내부 연결에 라우터를 남용하면 불필요한 비용 증가
2. **성능 설계:** 스위치는 고속 내부 통신, 라우터는 인터넷/WAN 연결 — 각각의 병목 지점이 다름
3. **보안 설계:** 라우터 기반 서브넷 분리로 부서 간 접근 제어 가능
4. **장애 범위:** 장비별 장애 영향 범위 이해 → 적절한 이중화 설계 필요

</details>

---

**문제 7.** (15점)
고객사가 "서버를 3대로 늘렸는데 왜 성능이 늘지 않느냐"고 묻는다. 현재 구성은 `단일 IP → 서버 3대` 형태이다. PM으로서 어떤 장비가 누락되어 있는지 설명하고, 해당 장비의 역할과 도입 시 기대 효과를 서술하시오.

<details>
<summary>모범 답안</summary>

**누락 장비: 로드 밸런서(Load Balancer)**

**현재 문제:**
단일 IP 뒤에 서버 3대가 있어도 트래픽이 어느 한 서버로만 집중되거나, DNS 라운드로빈만으로는 세션 상태 유지 불가.

**로드 밸런서 역할:**
1. 클라이언트 요청을 알고리즘(Round Robin, Least Connection 등)에 따라 서버 3대에 균등 분배
2. 서버 헬스체크: 다운된 서버로 트래픽 자동 차단
3. 세션 유지(Sticky Session): 동일 사용자를 동일 서버로 연결
4. SSL 오프로드: 암호화/복호화 처리를 서버 대신 담당

**도입 시 기대 효과:**
- 이론적 처리 용량: 1서버 대비 3배 향상
- 가용성: 서버 1대 장애 시에도 서비스 계속
- SLA: 99.9% → 99.99% 가용성 달성 가능

**PM 교훈:** 서버 증설만으로 성능이 선형 향상되지 않는 이유를 이해하고, 아키텍처 수준의 해결책을 기술팀과 논의할 수 있어야 한다.

</details>

---

**문제 8.** (15점)
다음 상황에서 PM이 취해야 할 행동을 단계별로 서술하시오.

> "개발팀 리더가 '현재 사무실 스위치가 100Mbps 구형이라 파일 공유가 너무 느리다. 1Gbps 스위치로 교체하고 싶다'고 요청했다. 예산은 팀장 결재 필요."

<details>
<summary>모범 답안</summary>

**PM 행동 단계:**

**1단계 - 요구사항 구체화 (1~2일)**
- 현재 파일 전송 속도 측정 (iperf 등 도구 활용 or IT팀 요청)
- 영향받는 인원 수 확인 (개발팀 몇 명?)
- 실제 병목이 스위치인지 확인 (서버 NIC, 케이블 등도 확인)

**2단계 - 비즈니스 영향 분석**
- 현재 느린 파일 공유로 인한 시간 손실 계산
  - 예: 20명 × 30분/일 낭비 × 22일 = 220시간/월
  - 개발자 시급 × 220시간 = 비용 손실 추정
- 스위치 교체 비용 vs 생산성 손실 비용 비교

**3단계 - 해결책 검토**
- L2 스위치 1Gbps 교체: 비용 50-200만원 (대수에 따라)
- 케이블 Cat5e → Cat6 업그레이드 필요 여부 확인
- 서버 NIC도 1Gbps 지원 여부 확인 (병목 이전이 될 수 있음)

**4단계 - 결재 준비**
- 현황/문제/해결책/비용 1페이지 요약 작성
- ROI: "월 220시간 × 개발자 시급 = 절감액 vs 교체비용 X개월 회수"

**5단계 - 실행 계획**
- 교체 일정 (업무 외 시간, 즉 야간/주말 권장)
- 교체 중 임시 대안 (일부 포트 1Gbps 스위치에 먼저 연결)
- 검수 기준 명시

**핵심:** PM은 기술 요청을 비즈니스 가치로 번역하여 의사결정권자가 승인하기 쉽게 만든다.

</details>

---

### 5교시 요약

| 장비 | 계층 | 역할 | PM 관점 |
|------|------|------|---------|
| 허브 | 1계층 | 브로드캐스트 전달 | 구식, 사용 금지 권고 |
| 스위치(L2) | 2계층 | MAC 기반 유니캐스트 | LAN 내부 연결 핵심 |
| 스위치(L3) | 3계층 | IP 기반 + 라우팅 | 대규모 네트워크 코어 |
| 라우터 | 3계층 | 네트워크 간 연결 | WAN/인터넷 연결 필수 |
| 로드 밸런서 | 4~7계층 | 트래픽 분산 | 고가용성/성능 서비스 |
| VPN 게이트웨이 | 3계층 | 암호화 터널 | 재택/지사 보안 접속 |
| AP | 1~2계층 | 무선 네트워크 | 커버리지/채널 설계 |

**PM 핵심 역할:**
- 장비 스펙을 비즈니스 요구사항(SLA, 사용자 수, 트래픽)으로 환산
- 초기 비용과 TCO(Total Cost of Ownership) 비교 분석
- 장애 발생 시 OSI 계층 기반 원인 추적 지원
- 용량 계획(Capacity Planning): 현재 + 3~5년 성장 고려


---

## 6교시: 네트워크 보안 (이론 + 예시 + 실습 + 퀴즈)

### 이론 (50분)

#### 1. 네트워크 보안 장비

**A. 방화벽 (Firewall)**

**정의:**
네트워크 트래픽을 **모니터링하고 제어**하여 **허가되지 않은 접근을 차단**하는 보안 장비

**역할:**
- 내부 네트워크와 외부(인터넷) 사이의 관문
- 보안 정책(Rule) 기반으로 허용/차단
- OSI Layer 3~7 (모델에 따라 다름)

**방화벽 종류:**

**1) Packet Filtering Firewall (패킷 필터링)**

**동작:**
- IP 주소, 포트, 프로토콜 기반으로 패킷 필터링
- Stateless (상태 정보 유지 안 함)
- 빠르지만 단순

**규칙 예시:**
```
Rule #  Action  Source IP       Dest IP       Protocol  Port  Description
1       ALLOW   192.168.1.0/24  0.0.0.0/0     TCP       80    내부 → 외부 HTTP 허용
2       ALLOW   192.168.1.0/24  0.0.0.0/0     TCP       443   내부 → 외부 HTTPS 허용
3       ALLOW   0.0.0.0/0       192.168.1.10  TCP       22    외부 → 서버 SSH 허용
4       DENY    0.0.0.0/0       192.168.1.0/24 ANY      ANY   나머지 차단 (기본 정책)
```

**장점:**
- 빠른 처리
- 저렴

**단점:**
- 단순한 패킷 헤더만 검사
- 애플리케이션 레벨 공격 탐지 불가
- 스푸핑(Spoofing) 공격에 취약

**2) Stateful Inspection Firewall (상태 검사 방화벽)**

**동작:**
- 연결 상태(Connection State)를 추적
- TCP 3-way handshake 확인
- 세션 테이블 유지

**예시:**
```
[내부 PC] → [Firewall] → [외부 Web Server]

1. PC가 외부 서버로 HTTP 요청 (SYN)
   → Firewall이 세션 기록: 192.168.1.10:54321 → 203.0.113.50:80 (STATE: SYN_SENT)

2. 서버 응답 (SYN-ACK)
   → Firewall이 세션 확인: 이 응답은 1번과 관련됨 → 허용
   → STATE: ESTABLISHED

3. PC가 ACK 전송
   → 세션 확립 완료

4. 응답 데이터
   → 세션이 열려있으므로 자동 허용

5. 연결 종료 후 세션 삭제
```

**장점:**
- 정상 연결에 대한 응답만 허용 (보안 향상)
- 대부분의 공격 차단

**단점:**
- 패킷 필터링보다 느림
- 세션 테이블 관리 필요 (메모리)

**3) Application Layer Firewall (애플리케이션 방화벽 / WAF)**

**동작:**
- OSI Layer 7 (애플리케이션 계층) 검사
- HTTP, FTP, SMTP 등 프로토콜 내용 분석
- Deep Packet Inspection (DPI)

**예시:**
```
HTTP 요청:
GET /api/users?id=1' OR '1'='1 HTTP/1.1

→ WAF가 SQL Injection 공격 패턴 탐지
→ 차단 및 알림
```

**보호 대상:**
- SQL Injection
- XSS (Cross-Site Scripting)
- CSRF (Cross-Site Request Forgery)
- DDoS 공격
- 악성 봇

**제품:**
- AWS WAF
- Cloudflare WAF
- ModSecurity (오픈소스)
- F5 BIG-IP

**장점:**
- 애플리케이션 레벨 공격 차단
- 웹 보안 필수

**단점:**
- 느림 (전체 내용 검사)
- 오탐 (False Positive) 가능
- 고가

**4) Next-Generation Firewall (NGFW)**

**통합 보안 솔루션:**
- 기존 방화벽 + IPS + 애플리케이션 제어 + 안티바이러스
- 위협 인텔리전스 (Threat Intelligence)
- 사용자/애플리케이션 기반 제어

**예시:**
```
규칙:
- 개발팀은 GitHub, AWS 접근 허용
- 영업팀은 Salesforce, Gmail 접근 허용
- 모든 팀은 Facebook, Netflix 차단 (업무 시간)
- 특정 국가 IP 차단 (예: 북한, 불필요 지역)
```

**제품:**
- Palo Alto Networks
- Fortinet FortiGate
- Cisco Firepower

**방화벽 배치 위치:**

**Perimeter Firewall (외곽 방화벽):**
```
[인터넷] ← → [Firewall] ← → [내부 네트워크]
```
- 외부 공격 1차 방어

**Internal Firewall (내부 방화벽):**
```
[DMZ] ← → [Firewall] ← → [내부 서버]
```
- 내부 네트워크 세그먼트 분리
- 침해 확산 방지

**Host-based Firewall (호스트 방화벽):**
```
각 서버/PC에 설치
- Windows Defender Firewall
- iptables (Linux)
- Third-party (Symantec, McAfee)
```

**PM 고려사항:**

**1) 보안 정책 수립:**
```
기본 원칙: Deny All, Allow by Exception (기본 차단, 명시적 허용)

예시:
- 개발 서버 (192.168.10.0/24)
  → 허용: SSH (22), HTTP (8080), MySQL (3306)
  → 출발지: 개발자 IP만
  
- 웹 서버 (DMZ 172.16.1.0/24)
  → 허용: HTTP (80), HTTPS (443)
  → 출발지: 모든 인터넷 (0.0.0.0/0)
  
- DB 서버 (192.168.20.0/24)
  → 허용: MySQL (3306)
  → 출발지: 웹 서버 IP만
```

**2) 성능:**
- 동시 세션 수 (Concurrent Sessions)
- 처리량 (Throughput): Gbps
- 지연시간 (Latency): < 10ms

**3) 이중화:**
- Active-Active 또는 Active-Standby
- 단일 장애점 방지

**4) 로그 및 모니터링:**
- Syslog 서버로 로그 전송
- SIEM (Security Information and Event Management) 연동
- 정기적인 정책 검토

**B. IDS/IPS (침입 탐지/방지 시스템)**

**IDS (Intrusion Detection System, 침입 탐지 시스템)**

**정의:**
네트워크 트래픽을 **모니터링**하여 **의심스러운 활동을 탐지하고 알림**

**동작 방식:**
- **패시브 (Passive)**: 트래픽을 복사하여 분석 (Port Mirroring)
- 트래픽을 차단하지 않음
- 탐지 시 관리자에게 알림

```
[Network] ─┬─> [Switch] ─> [Destination]
           │
           └─> (Mirror) ─> [IDS] ─> [Alert]
```

**탐지 방법:**

**1) Signature-based (서명 기반)**
- 알려진 공격 패턴 데이터베이스와 비교
- 예: SQL Injection 패턴 "' OR '1'='1"
- 빠르고 정확
- 단점: 새로운 공격(Zero-day) 탐지 불가

**2) Anomaly-based (이상 기반)**
- 정상 행위 프로파일 학습
- 정상에서 벗어난 행위 탐지
- 예: 평소 트래픽 10MB/s → 갑자기 100MB/s (DDoS 의심)
- 단점: 오탐 많음

**3) Heuristic-based (휴리스틱)**
- 규칙 및 행위 분석
- 예: 짧은 시간에 다수 IP 스캔 → 포트 스캔 공격

**알림 예시:**
```
[ALERT] 2026-02-20 10:30:00
Source: 203.0.113.50:4444
Destination: 192.168.1.10:22
Signature: SSH Brute Force Attack Detected
Severity: HIGH
Description: 5분 내 500회 로그인 시도
Action: Notify Administrator
```

**장점:**
- 트래픽에 영향 없음 (패시브)
- 상세한 분석 가능

**단점:**
- 실시간 차단 불가
- 탐지 후 수동 대응 필요

**IPS (Intrusion Prevention System, 침입 방지 시스템)**

**정의:**
IDS + **자동 차단 기능** (인라인 배치)

**동작 방식:**
- **Inline (Active)**: 모든 트래픽이 IPS를 경유
- 의심스러운 트래픽 즉시 차단

```
[Internet] ─> [Firewall] ─> [IPS] ─> [Switch] ─> [Servers]
                                │
                                ├─> [Block] ─X─> 공격 트래픽 차단
                                └─> [Allow] ─✓─> 정상 트래픽 허용
```

**차단 방법:**

**1) Drop Packet (패킷 폐기)**
- 악의적 패킷 즉시 폐기

**2) Reset Connection (연결 초기화)**
- TCP RST 패킷 전송하여 연결 강제 종료

**3) Block IP (IP 차단)**
- 공격 Source IP를 일정 시간 차단
- 예: 10분 동안 차단

**예시:**
```
공격자 (203.0.113.50) → SQL Injection 시도
→ IPS 탐지: "UNION SELECT * FROM users--"
→ 즉시 패킷 폐기 + 해당 IP 30분 차단
→ 관리자에게 알림
```

**장점:**
- 실시간 자동 차단
- 보안 강화

**단점:**
- 오탐 시 정상 트래픽도 차단 (서비스 영향)
- 트래픽 지연 발생 가능
- 단일 장애점 (IPS 다운 시 전체 차단)

**IDS vs IPS 비교:**

| 구분 | IDS | IPS |
|------|-----|-----|
| **배치** | 패시브 (Mirror Port) | 액티브 (Inline) |
| **차단** | ❌ (알림만) | ✅ (자동 차단) |
| **성능 영향** | 없음 | 약간 있음 (지연) |
| **오탐 영향** | 알림만 (서비스 무방) | 정상 트래픽 차단 (서비스 영향) |
| **SPOF** | 아니오 | 예 (이중화 필수) |
| **응답 속도** | 수동 (관리자 개입) | 실시간 (자동) |
| **비용** | 저렴 | 고가 |
| **적합 환경** | 분석, 모니터링 | 운영 환경, 고보안 |

**제품:**
- Snort (오픈소스 IDS/IPS)
- Suricata (오픈소스 IDS/IPS)
- Cisco Firepower
- Palo Alto Networks (NGFW에 IPS 포함)

**PM 의사결정:**

**개발/테스트 환경:**
- IDS 권장 (오탐 시에도 서비스 중단 없음)
- 로그 분석 및 규칙 튜닝

**프로덕션 환경:**
- IPS 권장 (실시간 차단 필요)
- 초기에는 IDS 모드로 운영 → 규칙 안정화 후 IPS 전환
- 이중화 필수

**C. DMZ (Demilitarized Zone, 비무장지대)**

**정의:**
**외부 네트워크와 내부 네트워크 사이의 완충 영역** (보안 구역)

**목적:**
- 외부에 공개해야 하는 서버를 격리
- 내부 네트워크 보호
- 공격 발생 시 내부로 확산 방지

**아키텍처:**

**기본 DMZ (Single Firewall):**
```
                [인터넷]
                    │
               [Firewall]
        ┌───────────┼───────────┐
        │           │           │
    [DMZ Zone]  [Internal Zone] 
   (공개 서버)    (내부 서버)
        │           │
    ┌───┴───┐   ┌───┴───┐
  웹 서버   메일   DB 서버  파일
  (80/443) (25)  (3306)   서버
```

**규칙:**
- **인터넷 → DMZ**: 허용 (80, 443)
- **DMZ → 내부**: 제한적 허용 (DB 연결만)
- **인터넷 → 내부**: 차단

**고급 DMZ (Dual Firewall / 3-Tier):**
```
                    [인터넷]
                        │
                  [Firewall 1]
                     (외부)
                        │
                     [DMZ]
                  (공개 서버)
                   웹 서버
                   API 서버
                        │
                  [Firewall 2]
                     (내부)
                        │
                 [Internal Network]
                  (내부 서버)
                   DB 서버
                   파일 서버
                   Active Directory
```

**보안 정책:**

**Firewall 1 (외부 방화벽):**
```
1. 인터넷 → DMZ 웹 서버:80,443     허용
2. 인터넷 → DMZ API 서버:443       허용
3. 인터넷 → 내부                   차단 (모든 트래픽)
4. DMZ → 인터넷                     허용 (패치, 업데이트)
```

**Firewall 2 (내부 방화벽):**
```
1. DMZ 웹 서버 → 내부 DB:3306      허용
2. DMZ API 서버 → 내부 DB:5432    허용
3. DMZ → 내부 파일 서버            차단
4. 내부 → DMZ                       허용 (관리용 SSH)
5. 내부 → 인터넷                    허용
```

**DMZ 배치 서버:**

**공개 필요:**
- 웹 서버 (HTTP/HTTPS)
- 메일 서버 (SMTP, POP3, IMAP)
- DNS 서버 (외부용)
- VPN 게이트웨이
- FTP 서버

**내부 유지:**
- 데이터베이스 서버
- 파일 서버
- Active Directory
- 내부 애플리케이션
- 백업 서버

**실제 프로젝트 예시:**

**이커머스 아키텍처:**
```
[인터넷]
    │
[CDN (Cloudflare)]
    │
[Load Balancer (DMZ)]
    │
[Firewall]
    │
┌───┴───────────┐
│               │
[DMZ]       [Internal]
 │               │
웹 서버       DB 서버
(Nginx)      (MySQL Master)
 │               │
API 서버     DB Replica
(Node.js)    (Read-only)
 │               │
        파일 서버 (NFS)
             │
        백업 서버
```

**트래픽 흐름:**
```
사용자 → CDN (정적 콘텐츠)
       → Load Balancer (DMZ)
       → 웹 서버 (DMZ)
       → API 서버 (DMZ)
       → DB 서버 (Internal)
```

**침해 시나리오 분석:**

**시나리오 1: 웹 서버 해킹**
```
공격자가 웹 서버 (DMZ) 침투
→ Firewall 2가 내부 네트워크 접근 차단
→ DB 연결만 허용 (제한적)
→ 내부 파일 서버, AD 접근 불가
→ 피해 최소화
```

**시나리오 2: DMZ 없이 웹 서버가 내부에 있는 경우**
```
공격자가 웹 서버 침투
→ 내부 네트워크에 바로 접근 가능
→ 모든 서버 공격 가능
→ 데이터 유출, 랜섬웨어 확산
```

**PM 체크리스트:**

**인프라 설계 단계:**
- [ ] 외부 공개 서버는 DMZ에 배치
- [ ] DMZ와 내부 네트워크 간 방화벽 설정
- [ ] 최소 권한 원칙 (Least Privilege)
- [ ] DMZ 서버는 내부 중요 데이터 접근 금지
- [ ] 정기적인 보안 감사 (Penetration Test)

**비용:**
- Dual Firewall: $10,000~$50,000
- 운영 복잡도 증가
- 보안 사고 비용 절감 (ROI 충분)

---

### 예시 (25분)

#### 예시 1: 방화벽 정책 오류로 인한 서비스 장애 - 핀테크 스타트업

**프로젝트 배경:**
- 2021년, 간편 송금 서비스
- 사용자: 50만 명
- AWS 클라우드 인프라

**배포 시나리오:**
2021년 11월 1일, 신규 기능 배포

**변경 사항:**
- 결제 API 서버 추가 (새 EC2 인스턴스)
- IP: 10.0.5.20

**장애 발생:**

**증상:**
```
오후 3시 배포 직후
→ 사용자들이 송금 실패
→ 모바일 앱: "서버 오류"
→ 에러율: 100%
```

**원인 조사:**

**1단계: 애플리케이션 로그 확인**
```
[ERROR] 2021-11-01 15:05:00
Connection timeout: 10.0.2.10:3306 (MySQL)
```

**2단계: 네트워크 테스트**
```bash
# 새 API 서버 (10.0.5.20)에서
$ telnet 10.0.2.10 3306
Trying 10.0.2.10...
telnet: Unable to connect to remote host: Connection timed out
```

**3단계: 방화벽 정책 확인**
```
Security Group: db-sg
Inbound Rules:
- Type: MySQL (3306)
- Source: 10.0.3.0/24  (기존 API 서버 서브넷)
- Source: 10.0.4.0/24  (추가 API 서버 서브넷)

문제: 새 API 서버 (10.0.5.20)의 서브넷 (10.0.5.0/24)이 누락!
```

**근본 원인:**
- 보안 정책 업데이트 누락
- 배포 체크리스트에 방화벽 규칙 확인 항목 없음

**영향:**
- 서비스 중단: 2시간 (15:00~17:00)
- 송금 실패 건수: 5,000건
- 고객 불만 및 보상 비용: 약 2,000만 원

**임시 조치 (15:30):**
```
Security Group db-sg에 규칙 추가:
- Source: 10.0.5.0/24
- Port: 3306

→ 즉시 복구
```

**근본 해결책:**

**1) 인프라 as Code (IaC) 도입**

**기존 방식 (수동):**
```
1. AWS Console에서 EC2 생성
2. Security Group 수동 설정
3. 누락 가능성 높음
```

**개선 (Terraform):**
```hcl
# terraform/security_groups.tf

# API 서버 Security Group
resource "aws_security_group" "api_sg" {
  name   = "api-sg"
  vpc_id = aws_vpc.main.id

  egress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = [aws_subnet.db_subnet.cidr_block]  # 자동으로 DB 서브넷 참조
  }
}

# DB Security Group
resource "aws_security_group" "db_sg" {
  name   = "db-sg"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    security_groups = [aws_security_group.api_sg.id]  # API SG에서만 허용
  }
}

# 새 API 서버 추가 시 자동으로 규칙 업데이트됨
```

**장점:**
- 코드로 관리 (버전 관리)
- 수동 오류 방지
- 코드 리뷰 가능

**2) 배포 체크리스트 강화**

```markdown
# 신규 서버 배포 체크리스트

## 사전 준비
- [ ] 서버 스펙 정의 (CPU, RAM, Disk)
- [ ] IP/서브넷 할당
- [ ] 보안 그룹 정의
  - [ ] Inbound 규칙 (어떤 서비스에서 접근?)
  - [ ] Outbound 규칙 (어떤 서비스로 접근?)

## 배포 전 테스트 (Staging)
- [ ] Staging 환경에서 동일하게 배포
- [ ] 연결 테스트 (telnet, curl)
- [ ] 애플리케이션 기능 테스트

## 배포
- [ ] Terraform apply 실행
- [ ] Security Group 변경 확인
- [ ] 애플리케이션 배포

## 배포 후 검증
- [ ] Health Check 통과
- [ ] 로그 확인 (에러 없음)
- [ ] 모니터링 대시보드 확인
- [ ] 실제 기능 테스트 (송금)

## Rollback Plan
- [ ] 롤백 시나리오 준비
- [ ] 이전 Security Group 백업
```

**3) 모니터링 및 알림**

```python
# CloudWatch Alarm 설정

Metric: ApplicationELB 4xx/5xx Error Rate
Threshold: > 5%
Duration: 5분

→ Slack 알림
→ On-call 엔지니어 호출
```

**결과:**
- 2022년 유사 배포 20회 → 장애 0건
- IaC 적용으로 배포 시간 50% 단축
- 수동 오류 완전 제거

**PM 교훈:**
- 인프라 변경도 코드로 관리 (IaC)
- 배포 체크리스트 필수
- Staging 환경에서 먼저 테스트
- 네트워크/보안은 개발자만의 책임이 아님 (PM도 이해 필요)

#### 예시 2: IPS 오탐으로 인한 정상 트래픽 차단 - 이커머스 플랫폼

**프로젝트 배경:**
- 2022년, 월 거래액 200억 원 이커머스
- 보안 강화를 위해 IPS 도입

**IPS 도입:**
- 제품: Snort IPS
- 배치: Inline (모든 트래픽 경유)
- 모드: Prevention (자동 차단)

**장애 발생:**

**시간:** 2022년 6월 15일 오전 10시 (할인 이벤트 시작)

**증상:**
- 일부 고객 접속 불가
- "연결이 거부되었습니다" 오류
- 고객 문의 폭주

**영향:**
- 차단된 사용자: 약 5,000명 (10%)
- 매출 손실: 약 2억 원 (2시간 동안)

**원인 조사:**

**IPS 로그 확인:**
```
[ALERT] 2022-06-15 10:15:00
Source: 203.0.113.50
Signature: SQL Injection Attack Detected
Packet: GET /products?sort=price&order=DESC
Action: Blocked IP for 30 minutes
```

**문제 분석:**
```
정상 요청:
GET /products?sort=price&order=DESC

IPS가 "DESC" 키워드를 SQL Injection으로 오인
→ 해당 IP를 30분 차단
→ 많은 사용자가 동일한 정렬 옵션 사용
→ 대량 차단 발생
```

**오탐 이유:**
- IPS 규칙이 너무 엄격
- 웹 애플리케이션 컨텍스트 미고려
- "DESC", "SELECT", "UNION" 등 키워드 단순 매칭

**근본 원인:**
- IPS를 **운영 환경에 바로 Prevention 모드로 배포**
- 사전 튜닝 없음
- False Positive 테스트 부족

**즉시 조치 (10:30):**

**1) IPS 모드 전환**
```
Prevention Mode → Detection Mode (알림만, 차단 안 함)
```

**2) 차단된 IP 해제**
```bash
# 수동으로 차단 목록에서 제거
$ sudo iptables -D INPUT -s 203.0.113.50 -j DROP
...
(5,000개 IP 해제, 스크립트 작성)
```

**3) 고객 공지**
```
"일시적인 시스템 오류로 일부 고객님의 접속이 제한되었습니다.
현재 복구 완료되었으며, 불편을 드려 죄송합니다."
```

**근본 해결책:**

**1) IPS 규칙 튜닝 (Tuning)**

**기존 규칙 (너무 엄격):**
```
alert tcp any any -> any 80 (
    content:"DESC";
    msg:"Possible SQL Injection";
    sid:1000001;
)
```

**개선된 규칙 (컨텍스트 고려):**
```
alert tcp any any -> any 80 (
    content:"DESC";
    content:"SELECT";  # DESC와 SELECT가 동시에 있을 때만
    pcre:"/\bSELECT\s+.*\bDESC\b/i";  # 정규식으로 SQL 문법 패턴 매칭
    msg:"SQL Injection Detected";
    sid:1000001;
)

# 정상 경로 화이트리스트
pass tcp any any -> any 80 (
    content:"GET /products";  # 정상 상품 조회는 허용
    sid:2000001;
)
```

**2) 단계적 배포 (Phased Rollout)**

**Phase 1: Detection Mode (2주)**
```
- IPS를 Detection 모드로 운영
- 알림만, 차단 안 함
- False Positive 분석
```

**로그 분석 결과:**
```
총 알림: 10,000건
└─ True Positive (실제 공격): 50건 (0.5%)
└─ False Positive (오탐): 9,950건 (99.5%)

주요 오탐 원인:
1. /products?sort=DESC → 2,000건
2. /search?q=SELECT+store → 3,000건
3. /api/orders?union_payment=true → 1,500건
```

**Phase 2: 규칙 튜닝 (1주)**
```
- 오탐 규칙 수정 또는 비활성화
- 화이트리스트 추가
- 재테스트
```

**Phase 3: Prevention Mode (점진적)**
```
- 먼저 개발/테스트 환경에 적용
- 1주일 모니터링
- Staging 환경 적용
- 1주일 모니터링
- Production 적용 (트래픽 10% → 50% → 100%)
```

**3) WAF로 역할 분담**

**아키텍처 개선:**
```
[인터넷]
    │
[CDN + WAF (Cloud)]  ← 애플리케이션 레벨 공격 (SQL Injection, XSS)
    │
[Load Balancer]
    │
[IPS (On-premise)]   ← 네트워크 레벨 공격 (Port Scan, DDoS)
    │
[Web/API Servers]
```

**역할 분담:**
- **WAF**: 웹 공격 (HTTP/HTTPS)
  - SQL Injection, XSS, CSRF
  - Rate Limiting
  - Bot Detection
  
- **IPS**: 네트워크 공격
  - Port Scan
  - Malware 전파
  - 알려진 취약점 Exploit

**장점:**
- WAF는 웹 컨텍스트 이해 → 오탐 감소
- IPS는 네트워크 레벨만 집중
- 계층별 방어 (Defense in Depth)

**4) 모니터링 및 알림**

```yaml
# Prometheus Alert Rules

groups:
  - name: IPS
    rules:
      - alert: IPS_HighBlockRate
        expr: rate(ips_blocked_ips[5m]) > 100  # 5분에 100개 이상 IP 차단
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: "IPS가 비정상적으로 많은 IP를 차단하고 있습니다"
          description: "False Positive 가능성 확인 필요"
      
      - alert: IPS_MassBlock
        expr: count(ips_blocked_ips) > 1000  # 동시에 1000개 이상 IP 차단
        labels:
          severity: critical
        annotations:
          summary: "IPS 대량 차단 발생! 즉시 확인 필요"
          description: "IPS를 Detection Mode로 전환 고려"
```

**최종 결과:**

**개선 전:**
- False Positive Rate: 99.5%
- 고객 불만: 높음
- 매출 손실: 2억 원

**개선 후 (3개월):**
- False Positive Rate: 0.1%
- True Positive (실제 공격 차단): 98건
- 고객 피해: 없음
- 보안 사고: 0건

**PM 교훈:**
- 보안 장비 도입 ≠ 즉시 안전
- 튜닝 없이는 오히려 서비스 해를 끼침
- Detection Mode → Prevention Mode (단계적)
- 보안과 가용성의 균형
- WAF + IPS 역할 분담

#### 예시 3: DMZ 미구축으로 인한 전사 침해 사고 - 중견 기업

**프로젝트 배경:**
- 2020년, 직원 300명 중견 제조업체
- 비용 절감을 위해 단순한 네트워크 구조

**초기 네트워크 아키텍처:**

```
         [인터넷]
             │
        [Firewall]
             │
   ──────────┼──────────
   │         │         │
웹 서버    DB 서버   파일 서버
(공개)    (내부)    (내부)
   │         │         │
   └─────────┴─────────┘
      모두 동일한 네트워크 (192.168.10.0/24)
```

**문제점:**
- 웹 서버와 내부 서버가 동일 네트워크
- DMZ 없음
- 웹 서버 침해 시 내부 접근 가능

**침해 사고 발생:**

**2020년 8월 10일**

**1단계: 웹 서버 취약점 공격**
```
공격자가 웹 서버 (192.168.10.10)의 알려진 취약점 공격
→ Apache Struts 원격 코드 실행 (CVE-2017-5638)
→ 웹 서버 장악
```

**2단계: 내부 네트워크 스캔**
```bash
# 공격자가 웹 서버에서 실행
$ nmap -sV 192.168.10.0/24

결과:
192.168.10.10 (웹 서버) - 이미 장악
192.168.10.20 (DB 서버) - MySQL 3306 열림
192.168.10.30 (파일 서버) - SMB 445 열림
192.168.10.40 (Active Directory) - LDAP 389 열림
...
```

**3단계: 측면 이동 (Lateral Movement)**
```
웹 서버에서 DB 서버로 접속 시도
→ 방화벽 없음 (동일 네트워크)
→ 약한 비밀번호 (admin/admin123)
→ DB 서버 침투
→ 고객 정보 10만 건 유출
```

**4단계: 랜섬웨어 배포**
```
공격자가 파일 서버에 랜섬웨어 배포
→ 전사 공유 폴더 암호화
→ 업무 마비
```

**피해 규모:**
- 개인정보 유출: 10만 건
- 랜섬 요구: 10 BTC (당시 약 1억 원)
- 복구 비용: 3억 원
- 과태료 (개인정보보호법): 5,000만 원
- 신뢰도 하락: 추정 불가

**사고 분석:**

**타임라인:**
```
Day 0 (08/10):  웹 서버 침투
Day 1 (08/11):  DB 서버 침투, 데이터 유출
Day 2 (08/12):  파일 서버 랜섬웨어, 업무 마비
Day 3 (08/13):  사고 인지 (직원 출근 후)
Day 30 (09/09): 복구 완료
```

**Root Cause (근본 원인):**

**1) DMZ 미구축**
- 웹 서버와 내부 서버가 동일 네트워크
- 웹 서버 침해 = 내부 침해

**2) 네트워크 세그먼트 미분리**
- Flat Network (평면 네트워크)
- 방화벽이 외부와 내부 사이에만 존재

**3) 최소 권한 원칙 미적용**
- 웹 서버가 DB에 직접 접근
- 모든 서버가 서로 통신 가능

**4) 취약점 관리 소홀**
- 웹 서버 패치 누락
- 알려진 취약점 방치

**조직적 원인:**
- "우리는 제조업이라 해킹 대상 아니다" (오만)
- 보안 예산 부족
- 보안 담당자 부재

**재발 방지 대책:**

**1) DMZ 구축 (3-Tier 아키텍처)**

**개선된 네트워크:**
```
                   [인터넷]
                       │
                 [Firewall 1]
                       │
                    [DMZ]
                (172.16.1.0/24)
                       │
                  웹 서버 (80/443)
                  WAF
                       │
                 [Firewall 2]
                       │
              [Internal Network]
              (192.168.10.0/24)
                       │
         ┌─────────────┼─────────────┐
         │             │             │
    DB 서버      파일 서버      AD 서버
    (3306)       (445)        (389)
```

**Firewall 1 규칙:**
```
1. 인터넷 → DMZ 웹:80,443    허용
2. 인터넷 → 내부              차단
3. DMZ → 인터넷               허용 (패치용)
4. DMZ → 내부                 차단 (Firewall 2에서 제어)
```

**Firewall 2 규칙:**
```
1. DMZ 웹 → 내부 DB:3306     허용 (애플리케이션 계정만)
2. DMZ → 내부 파일 서버       차단
3. DMZ → AD                   차단
4. 내부 → DMZ                 허용 (관리용 SSH:22)
```

**2) 네트워크 세그먼트 분리**

```
VLAN 10 (DMZ):        172.16.1.0/24
VLAN 20 (App):        192.168.10.0/24
VLAN 30 (DB):         192.168.20.0/24
VLAN 40 (File/AD):    192.168.30.0/24
VLAN 50 (Management): 192.168.99.0/24
```

**침해 시나리오 재검증:**
```
공격자가 웹 서버 (DMZ) 침투
→ Firewall 2가 DB 외 접근 차단
→ DB 접근도 애플리케이션 계정만 (권한 제한)
→ 파일 서버, AD 접근 불가
→ 피해 최소화 (웹 서버만)
```

**3) 애플리케이션 계정 분리**

**기존:**
```
웹 서버 → DB 연결
계정: root / password123
권한: 모든 DB, 모든 테이블
```

**개선:**
```
웹 서버 → DB 연결
계정: app_user / (복잡한 비밀번호)
권한: 필요한 DB, 필요한 테이블만
  - customer DB: SELECT, INSERT, UPDATE (DELETE 없음)
  - 다른 DB: 접근 불가

→ 침투해도 customer DB만 영향
→ 파괴적 명령(DROP, TRUNCATE) 불가
```

**4) IDS/IPS 도입**

```
[DMZ] → [IPS] → [Internal]

IPS 규칙:
- 포트 스캔 탐지 (nmap)
- 의심스러운 SQL 쿼리 (UNION, ;)
- 랜섬웨어 시그니처
```

**5) 정기 보안 점검**

```markdown
# 월간 보안 점검 체크리스트

## 취약점 스캔
- [ ] 모든 public-facing 서버 스캔 (Nessus, OpenVAS)
- [ ] 발견된 취약점 → 위험도 평가 → 2주 내 패치

## 패치 관리
- [ ] 운영체제 패치 (월 1회)
- [ ] 웹 프레임워크, 라이브러리 업데이트
- [ ] 데이터베이스 보안 패치

## 로그 검토
- [ ] 방화벽 로그 (차단된 트래픽 분석)
- [ ] 웹 서버 로그 (이상 접근 패턴)
- [ ] DB 로그 (비정상 쿼리)

## 침투 테스트 (연 2회)
- [ ] 외부 침투 테스트 (Penetration Test)
- [ ] 내부 침투 테스트
- [ ] 소셜 엔지니어링 훈련
```

**최종 결과:**

**개선 전:**
- 네트워크: Flat (단순)
- 보안: 외부 방화벽만
- 침해 시: 전사 마비
- 복구 시간: 30일
- 비용: 수억 원

**개선 후:**
- 네트워크: 3-Tier (DMZ)
- 보안: 다층 방어
- 침해 시: DMZ만 격리
- 복구 시간: < 1일
- 예방 비용: 연 5,000만 원 (투자)

**PM 교훈:**
- "우리는 대상이 아니다"는 착각
- 보안은 비용이 아닌 투자
- DMZ는 필수 (외부 공개 서버)
- 침해는 "If"가 아닌 "When" (언제 당할지의 문제)
- 보안 사고 비용 >> 보안 투자 비용

---

### 실습 (20분)

#### 실습 1: 방화벽 규칙 설계

**과제:**
회사 네트워크의 방화벽 규칙을 설계하세요.

**네트워크 구조:**
```
- DMZ (172.16.1.0/24)
  - 웹 서버: 172.16.1.10
  - API 서버: 172.16.1.20

- Internal (192.168.10.0/24)
  - DB 서버: 192.168.10.10
  - 파일 서버: 192.168.10.20
  - AD 서버: 192.168.10.30

- Management (192.168.99.0/24)
  - 관리자 PC: 192.168.99.10
```

**요구사항:**
1. 인터넷에서 웹/API 서버만 접근 가능
2. 웹/API 서버는 DB만 접속 가능
3. 관리자는 모든 서버에 SSH 접근 가능
4. 기본 차단 정책 (Deny All)

---

**해설:**

**방화벽 규칙 (iptables 예시):**

```bash
#!/bin/bash
# Firewall Rules for Company Network

# 기본 정책: 모두 차단
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# ===== Firewall 1: Internet → DMZ =====

# 인터넷 → 웹 서버 (HTTP/HTTPS)
iptables -A FORWARD -p tcp -d 172.16.1.10 --dport 80 -j ACCEPT
iptables -A FORWARD -p tcp -d 172.16.1.10 --dport 443 -j ACCEPT

# 인터넷 → API 서버 (HTTPS)
iptables -A FORWARD -p tcp -d 172.16.1.20 --dport 443 -j ACCEPT

# DMZ → 인터넷 (패치, 업데이트)
iptables -A FORWARD -s 172.16.1.0/24 -j ACCEPT

# ===== Firewall 2: DMZ → Internal =====

# 웹 서버 → DB 서버 (MySQL)
iptables -A FORWARD -s 172.16.1.10 -d 192.168.10.10 -p tcp --dport 3306 -j ACCEPT

# API 서버 → DB 서버 (PostgreSQL)
iptables -A FORWARD -s 172.16.1.20 -d 192.168.10.10 -p tcp --dport 5432 -j ACCEPT

# DMZ → 파일 서버, AD 차단 (명시적)
iptables -A FORWARD -s 172.16.1.0/24 -d 192.168.10.20 -j DROP
iptables -A FORWARD -s 172.16.1.0/24 -d 192.168.10.30 -j DROP

# ===== Management: 관리자 접근 =====

# 관리자 → 모든 서버 SSH (22)
iptables -A FORWARD -s 192.168.99.10 -p tcp --dport 22 -j ACCEPT

# ===== Stateful 규칙 (응답 허용) =====
iptables -A FORWARD -m state --state ESTABLISHED,RELATED -j ACCEPT

# ===== 로깅 (차단된 패킷) =====
iptables -A FORWARD -j LOG --log-prefix "[FW-DROP] "
iptables -A FORWARD -j DROP

# 규칙 저장
iptables-save > /etc/iptables/rules.v4
```

**규칙 검증:**

**테스트 1: 인터넷 → 웹 서버 (허용)**
```bash
$ curl http://172.16.1.10
→ 성공 (200 OK)
```

**테스트 2: 인터넷 → DB 서버 (차단)**
```bash
$ telnet 192.168.10.10 3306
→ 타임아웃 (차단됨)
```

**테스트 3: 웹 서버 → DB 서버 (허용)**
```bash
# 웹 서버에서
$ mysql -h 192.168.10.10 -u app_user -p
→ 연결 성공
```

**테스트 4: 웹 서버 → 파일 서버 (차단)**
```bash
# 웹 서버에서
$ smbclient //192.168.10.20/share
→ 연결 실패 (차단됨)
```

**테스트 5: 관리자 → 모든 서버 SSH (허용)**
```bash
# 관리자 PC에서
$ ssh admin@172.16.1.10     # 웹 서버
$ ssh admin@192.168.10.10   # DB 서버
→ 모두 연결 성공
```

**PM 체크리스트:**

- [ ] 기본 정책이 Deny All인가?
- [ ] 필요한 트래픽만 명시적으로 허용했는가?
- [ ] 관리 접근 경로가 보호되어 있는가?
- [ ] Stateful 규칙으로 응답 트래픽 허용했는가?
- [ ] 로깅이 활성화되어 있는가?
- [ ] 정기적으로 규칙을 검토하는가?

#### 실습 2: IDS 로그 분석

**과제:**
Snort IDS 로그를 분석하여 공격 유형을 식별하고 대응 방안을 제시하세요.

**로그 샘플:**

```
[**] [1:100001:1] SCAN Nmap TCP scan [**]
[Priority: 2]
02/20-10:15:23.123456 203.0.113.50:54321 -> 192.168.1.10:80
TCP TTL:64 TOS:0x0 ID:12345 IpLen:20 DgmLen:60
******S* Seq: 0x12345678  Ack: 0x0  Win: 0x2000  TcpLen: 40

[**] [1:100002:1] WEB-ATTACKS SQL injection attempt [**]
[Priority: 1]
02/20-10:20:15.987654 203.0.113.50:54322 -> 192.168.1.10:80
TCP TTL:64 TOS:0x0 ID:12346 IpLen:20 DgmLen:200
***AP*** Seq: 0x12345679  Ack: 0x12345678  Win: 0x2000  TcpLen: 20
GET /products?id=1' UNION SELECT * FROM users-- HTTP/1.1

[**] [1:100003:1] MALWARE-CNC Ransomware C2 Beacon [**]
[Priority: 1]
02/20-10:25:30.111111 192.168.1.10:55555 -> 198.51.100.20:443
TCP TTL:64 TOS:0x0 ID:12347 IpLen:20 DgmLen:150
***AP*** Seq: 0x87654321  Ack: 0x87654320  Win: 0x2000  TcpLen: 20
```

---

**해설:**

**공격 1: 포트 스캔 (Nmap)**

**로그 분석:**
```
시간: 10:15:23
출발지: 203.0.113.50
목적지: 192.168.1.10:80
Flag: SYN only (S)
우선순위: 2 (중간)
```

**공격 유형:**
- TCP SYN 스캔 (Half-open scan)
- 공격자가 열린 포트를 찾는 정찰 단계

**대응 방안:**

**1) 즉시 조치 (Tactical)**
```
- 출발지 IP (203.0.113.50)를 임시 차단 (24시간)
- 포트 스캔 활동 모니터링 강화
```

**2) 추가 조사 (Investigative)**
```
- 해당 IP의 다른 활동 확인 (로그 검색)
- 스캔 대상 서버 확인 (다른 서버도 스캔되었나?)
- Whois 조회 (국가, ISP)
```

**3) 장기 대책 (Strategic)**
```
- 포트 스캔 탐지 규칙 강화
- 불필요한 포트 닫기
- 방화벽에 Rate Limiting 설정 (초당 SYN 패킷 제한)
```

**공격 2: SQL Injection**

**로그 분석:**
```
시간: 10:20:15 (포트 스캔 5분 후)
출발지: 203.0.113.50 (동일 IP!)
목적지: 192.168.1.10:80
페이로드: ' UNION SELECT * FROM users--
우선순위: 1 (높음)
```

**공격 유형:**
- SQL Injection (Union-based)
- `users` 테이블 데이터 탈취 시도

**심각도:**
- 매우 높음 (데이터 유출 가능)

**대응 방안:**

**1) 긴급 조치 (Immediate)**
```bash
# 해당 IP 즉시 차단
iptables -I INPUT -s 203.0.113.50 -j DROP

# 웹 서버 로그 확인
grep "203.0.113.50" /var/log/apache2/access.log

# 공격 성공 여부 확인
grep "200 OK" ...  # 성공 시 200 반환
grep "500" ...     # SQL 오류 시 500 반환
```

**2) 데이터베이스 확인 (Urgent)**
```sql
-- DB 로그 확인 (공격 시각 전후)
SELECT * FROM mysql.general_log
WHERE event_time BETWEEN '2026-02-20 10:20:00' AND '2026-02-20 10:21:00';

-- 의심스러운 쿼리 확인
-- UNION SELECT가 실행되었는지?
```

**3) 취약점 패치 (Critical)**
```
- 애플리케이션 코드 검토
- Prepared Statement 사용 (SQL Injection 방지)
- 입력 검증 강화
- WAF 규칙 업데이트
```

**4) 사고 대응 절차**
```
1. 사고 확인 (10:20) ✅
2. 영향 범위 파악 (10:25)
   - 데이터 유출 여부?
   - 다른 서버 공격?
3. 격리 (10:30)
   - IP 차단
   - 취약 서버 네트워크 격리 (필요 시)
4. 복구 (11:00)
   - 취약점 패치
   - 재배포
5. 사후 분석 (익일)
   - Root Cause Analysis
   - 재발 방지 대책
```

**공격 3: 랜섬웨어 C2 비콘**

**로그 분석:**
```
시간: 10:25:30 (SQL Injection 5분 후!)
출발지: 192.168.1.10 (내부 서버!)
목적지: 198.51.100.20:443 (외부 C2 서버)
시그니처: Ransomware C&C (Command and Control)
우선순위: 1 (최고)
```

**심각도:**
- **치명적 (Critical)**
- 서버가 이미 침해당함
- 랜섬웨어가 C2 서버와 통신 중

**의미:**
```
SQL Injection 공격 성공
→ 웹셸 업로드
→ 랜섬웨어 다운로드 및 실행
→ C2 서버에 연결 (암호화 키 수신, 지시 대기)
```

**대응 방안:**

**1) 즉각 격리 (IMMEDIATE)**
```bash
# 해당 서버 네트워크 즉시 차단
iptables -I OUTPUT -s 192.168.1.10 -j DROP
iptables -I INPUT -d 192.168.1.10 -j DROP

# 또는 물리적으로 네트워크 케이블 제거
```

**2) 전사 비상 대응 (Emergency)**
```
1. 전 직원 통지: "랜섬웨어 감염 의심, 모든 PC 사용 중지"
2. 백업 즉시 오프라인으로 전환 (2차 감염 방지)
3. 사고 대응팀 소집
```

**3) 포렌식 (Forensics)**
```bash
# 서버 즉시 이미징 (증거 보존)
dd if=/dev/sda of=/mnt/forensics/server-image.dd

# 메모리 덤프
lime-forensics

# 타임라인 분석
- SQL Injection: 10:20
- 파일 생성: 10:22 (/tmp/ransomware.exe)
- C2 연결: 10:25
- 암호화 시작: 10:26 (추정)
```

**4) 복구 계획**
```
Option 1: 백업 복구 (권장)
- 최신 백업: 02/20 00:00 (10시간 전)
- 복구 시간: 2~4시간
- 데이터 손실: 10시간 분량

Option 2: 랜섬 지불 (비권장)
- 비용: 불명
- 복호화 보장 안 됨
- 범죄 지원, 재공격 가능성

결정: Option 1 (백업 복구)
```

**PM 리포트:**

```markdown
# 보안 사고 보고서

## 사고 개요
- 날짜: 2026-02-20
- 시간: 10:15~10:30 (15분)
- 공격자 IP: 203.0.113.50
- 피해 서버: 192.168.1.10 (웹 서버)

## 공격 타임라인
1. 10:15 - 포트 스캔 (정찰)
2. 10:20 - SQL Injection (침투)
3. 10:25 - 랜섬웨어 C2 통신 (악성코드 실행)
4. 10:26 - 탐지 및 격리

## 영향
- 웹 서버 1대 침해
- 랜섬웨어 감염 (암호화 전 차단)
- 서비스 중단: 4시간 (백업 복구)
- 데이터 유출: 확인 중

## 근본 원인
- SQL Injection 취약점 (코드 검증 부족)
- IDS만 있고 IPS 없음 (자동 차단 불가)
- 웹 서버와 DB가 동일 네트워크 (세그먼트 미분리)

## 재발 방지 대책
1. 코드 보안 검토 및 패치 (Prepared Statement)
2. IPS 도입 (자동 차단)
3. DMZ 구축 (웹 서버 격리)
4. WAF 도입 (웹 공격 방어)
5. 정기 취약점 스캔 (월 1회)
```

**PM 교훈:**
- IDS 로그는 **즉시 확인 및 대응** 필요
- 공격은 **단계적으로 진행** (정찰 → 침투 → 확산)
- **초기 탐지가 중요** (포트 스캔 단계에서 차단)
- IDS만으로는 부족 → IPS, WAF 필요
- **사고 대응 계획(IRP)** 필수

#### 실습 3: DMZ 아키텍처 설계

**과제:**
중소기업의 네트워크를 DMZ 기반으로 재설계하세요.

**요구사항:**
- 직원: 50명
- 서비스: 이커머스 웹사이트
- 서버: 웹 서버 2대, API 서버 2대, DB 서버 1대, 파일 서버 1대

**제약:**
- 예산: 5,000만 원
- 고가용성 필요
- 클라우드(AWS) 사용 가능

---

**해설:**

**네트워크 아키텍처:**

```
                    [인터넷]
                        │
                  [AWS Route53]
                   (DNS, GeoDNS)
                        │
                [AWS CloudFront]
                 (CDN + WAF)
                        │
              [AWS Application Load Balancer]
               (Health Check, SSL 종료)
                        │
          ┌─────────────┴─────────────┐
          │                           │
       [AZ-1]                      [AZ-2]
     (가용영역 1)                  (가용영역 2)
          │                           │
    ══════════════════════════════════════════════
    │                DMZ                         │
    │   (Public Subnet)                         │
    │                                            │
    │   웹 서버 1         웹 서버 2              │
    │   (10.0.1.10)       (10.0.2.10)           │
    │                                            │
    │   API 서버 1         API 서버 2            │
    │   (10.0.1.20)       (10.0.2.20)           │
    ══════════════════════════════════════════════
                        │
               [NAT Gateway + Security Group]
                        │
    ══════════════════════════════════════════════
    │          Internal Network                  │
    │        (Private Subnet)                   │
    │                                            │
    │   DB 서버 (Master)  DB 서버 (Replica)      │
    │   (10.0.11.10)      (10.0.12.10)          │
    │                     (Read-only)            │
    │                                            │
    │   파일 서버 (EFS)                          │
    │   (자동 이중화)                            │
    │                                            │
    │   Bastion Host                             │
    │   (관리용, 10.0.11.99)                     │
    ══════════════════════════════════════════════
                        │
                   [S3 Backup]
                  (데이터 백업)
```

**상세 설계:**

**1) DMZ (Public Subnet)**

**웹 서버 (Nginx):**
```
- EC2 t3.medium × 2 (AZ 분산)
- CPU: 2 vCPU, RAM: 4GB
- 정적 파일 서빙
- API로 프록시
```

**API 서버 (Node.js):**
```
- EC2 t3.medium × 2 (AZ 분산)
- CPU: 2 vCPU, RAM: 4GB
- RESTful API
- DB 연결
```

**Security Group (DMZ-SG):**
```
Inbound:
- 0.0.0.0/0 → 80, 443  (ALB에서만)
- 10.0.11.99 → 22      (Bastion에서 SSH)

Outbound:
- 10.0.11.0/24 → 3306  (DB 접근)
- 0.0.0.0/0 → 80, 443  (패치용)
```

**2) Internal Network (Private Subnet)**

**DB 서버 (RDS MySQL):**
```
- Primary (AZ-1): 10.0.11.10
- Replica (AZ-2): 10.0.12.10 (Read-only)
- 인스턴스: db.t3.small (Multi-AZ)
- 자동 백업: 7일 보관
- Automated Failover
```

**파일 서버 (EFS):**
```
- AWS EFS (Elastic File System)
- 자동 이중화 (Multi-AZ)
- 웹/API 서버에서 마운트
- 사용량 기반 과금
```

**Bastion Host:**
```
- EC2 t3.micro × 1
- 관리용 서버 (SSH 게이트웨이)
- MFA (Multi-Factor Authentication) 필수
- 세션 로깅
```

**Security Group (Internal-SG):**
```
Inbound:
- 10.0.1.0/24 → 3306   (DMZ API에서 DB)
- 10.0.2.0/24 → 3306
- 10.0.11.99 → 22, 3306 (Bastion으로 관리)

Outbound:
- 없음 (외부 통신 불필요)
```

**3) 보안 계층**

**AWS WAF (Web Application Firewall):**
```
규칙:
- SQL Injection 차단
- XSS 차단
- Rate Limiting (초당 100 req)
- GEO Blocking (불필요한 국가 차단)
```

**Network ACL:**
```
Subnet별 추가 필터링
- DMZ: 인터넷 허용
- Internal: DMZ에서만 허용
```

**CloudTrail + GuardDuty:**
```
- 모든 API 호출 로깅
- 이상 행위 탐지 (Anomaly Detection)
- 자동 알림 (Slack, Email)
```

**4) 고가용성 (High Availability)**

**로드 밸런싱:**
```
Application Load Balancer
│
├─ Target Group 1: 웹 서버 (80, 443)
│   ├─ 웹 서버 1 (AZ-1)
│   └─ 웹 서버 2 (AZ-2)
│
└─ Target Group 2: API 서버 (8080)
    ├─ API 서버 1 (AZ-1)
    └─ API 서버 2 (AZ-2)

Health Check:
- 주기: 30초
- 임계값: 2회 연속 실패 시 제거
- 복구 시 자동 추가
```

**Auto Scaling:**
```python
# Auto Scaling 정책
- Min: 2 (최소 2대 유지)
- Max: 10 (최대 10대까지 확장)
- Desired: 2 (평소 2대)

Scale Out 조건:
- CPU > 70% (5분 지속)
- 또는 요청 수 > 1000 req/min

Scale In 조건:
- CPU < 30% (15분 지속)
```

**데이터베이스 이중화:**
```
RDS Multi-AZ:
- Primary (AZ-1)
- Standby (AZ-2): 자동 동기화
- Failover: 60~120초 (자동)
```

**5) 백업 및 복구**

**백업 전략:**
```
DB:
- 자동 백업: 매일 (7일 보관)
- 수동 스냅샷: 월 1회 (90일 보관)

파일:
- EFS → S3 (AWS Backup)
- 매일 증분 백업
- 30일 보관

애플리케이션:
- Docker 이미지: ECR
- 코드: GitHub
```

**재해 복구 (DR):**
```
RPO (Recovery Point Objective): 1시간
RTO (Recovery Time Objective): 2시간

절차:
1. 다른 리전의 스냅샷에서 DB 복원
2. AMI에서 EC2 인스턴스 생성
3. Route53으로 DNS 전환
4. 서비스 재개
```

**비용 산정 (월):**

| 항목 | 사양 | 수량 | 단가 | 월 비용 |
|------|------|------|------|---------|
| **웹 서버** | EC2 t3.medium | 2 | $30 | $60 |
| **API 서버** | EC2 t3.medium | 2 | $30 | $60 |
| **DB 서버** | RDS db.t3.small Multi-AZ | 1 | $50 | $50 |
| **파일 서버** | EFS 100GB | 1 | $30 | $30 |
| **Bastion** | EC2 t3.micro | 1 | $8 | $8 |
| **ALB** | Application Load Balancer | 1 | $20 | $20 |
| **NAT Gateway** | - | 2 | $30 | $60 |
| **CloudFront** | CDN | - | 트래픽 기반 | $50 |
| **WAF** | - | 1 | $5 + 규칙 | $15 |
| **Route53** | DNS | 1 | $1 | $1 |
| **Backup (S3)** | 200GB | 1 | $5 | $5 |
| **CloudTrail** | 로깅 | 1 | $5 | $5 |
| **GuardDuty** | 위협 탐지 | 1 | $4 | $4 |
| **데이터 전송** | 아웃바운드 1TB | - | $90 | $90 |
| **합계** | | | | **$458 (약 60만 원)** |

**초기 구축 비용:**
```
- AWS 프로페셔널 서비스: 1,000만 원
- 보안 컨설팅: 500만 원
- 마이그레이션: 1,000만 원
───────────────────────────────────
총 초기 비용: 2,500만 원
```

**총 1년 비용:**
```
초기: 2,500만 원
운영: 60만 원 × 12 = 720만 원
────────────────────────────────
총: 3,220만 원 (예산 5,000만 원 내)
```

**PM 의사결정 근거:**

**왜 클라우드?**
- 초기 투자 절감 (서버 구매 불필요)
- 고가용성 내장 (Multi-AZ)
- 자동 확장 (Auto Scaling)
- 관리 용이 (Managed Service)
- 보안 강화 (AWS Shield, WAF)

**온프레미스 vs 클라우드 비교:**

| 항목 | 온프레미스 | 클라우드 (AWS) |
|------|-----------|----------------|
| **초기 비용** | 5,000만 원 | 2,500만 원 |
| **월 운영** | 100만 원 (전기, 인건비) | 60만 원 |
| **이중화** | 수동 구성 필요 | 자동 (Multi-AZ) |
| **확장성** | 하드웨어 구매 (수주) | 즉시 (Auto Scaling) |
| **보안** | 자체 구축 | Managed (WAF, GuardDuty) |
| **유지보수** | 자체 인력 | AWS 담당 |
| **백업/복구** | 수동 | 자동 |

**결론:** 클라우드 채택

---

### 퀴즈 (15분)

#### 객관식 (각 5점, 총 25점)

**1. Hub, Switch, Router 중 OSI 3계층(네트워크 계층)에서 동작하는 장비는?**

① Hub  
② Switch  
③ Router  
④ Hub와 Switch  
⑤ Switch와 Router

**정답:** ③

**해설:**  
- **Hub**: Layer 1 (물리 계층) - 단순 신호 증폭
- **Switch**: Layer 2 (데이터링크 계층) - MAC 주소 기반
- **Router**: Layer 3 (네트워크 계층) - IP 주소 기반 ✅

Router는 IP 주소를 확인하여 최적의 경로로 패킷을 전달하는 역할을 합니다.

---

**2. 방화벽에서 "Stateful Inspection"이란?**

① 패킷의 출발지와 목적지 IP만 확인  
② 연결 상태(Connection State)를 추적하여 관련 패킷 허용  
③ 애플리케이션 레벨까지 검사  
④ 패킷 내용을 암호화  
⑤ 모든 패킷을 차단

**정답:** ②

**해설:**  
**Stateful Inspection (상태 검사)**은 방화벽이 TCP 연결의 상태를 추적하여, 이미 수립된 연결에 대한 응답 패킷은 자동으로 허용하는 방식입니다.

**예시:**
```
내부 PC → 외부 서버: HTTP 요청 (규칙에 따라 허용)
→ 방화벽이 세션 테이블에 기록
외부 서버 → 내부 PC: HTTP 응답
→ 방화벽이 세션 테이블 확인 후 자동 허용 (별도 규칙 불필요)
```

**장점:**
- 보안 향상 (정상 연결 응답만 허용)
- 규칙 관리 간소화

---

**3. IDS와 IPS의 가장 큰 차이점은?**

① 탐지 방법 (서명 vs 이상)  
② 배치 위치 (DMZ vs 내부)  
③ 차단 기능 유무 (IDS는 알림만, IPS는 자동 차단)  
④ 지원 프로토콜 (TCP vs UDP)  
⑤ 가격 (IDS가 더 비쌈)

**정답:** ③

**해설:**  
- **IDS (Intrusion Detection System)**: **탐지만** 수행, 관리자에게 알림
  - 패시브 배치 (Mirror Port)
  - 트래픽에 영향 없음
  
- **IPS (Intrusion Prevention System)**: 탐지 + **자동 차단**
  - 인라인 배치 (모든 트래픽 경유)
  - 악의적 트래픽 즉시 차단

**비유:**
- IDS = CCTV (녹화 및 알림)
- IPS = 자동 출입 통제 시스템 (불법 침입자 차단)

---

**4. DMZ(Demilitarized Zone)의 주요 목적은?**

① 네트워크 속도 향상  
② 외부 공개 서버를 격리하여 내부 네트워크 보호  
③ IP 주소 절약  
④ 무선 네트워크 보안  
⑤ 데이터 백업

**정답:** ②

**해설:**  
DMZ는 **외부에 공개해야 하는 서버(웹, 메일 등)를 내부 네트워크와 격리**하여, 외부 공격이 내부로 확산되는 것을 방지하는 보안 구역입니다.

**아키텍처:**
```
인터넷 → [FW1] → DMZ(웹/메일 서버) → [FW2] → 내부(DB/파일 서버)
```

**장점:**
- 웹 서버 침해 시 내부 네트워크는 안전
- 내부 중요 자산 보호
- 보안 정책 세분화

---

**5. 다음 중 Well-Known Port가 아닌 것은?**

① 22 (SSH)  
② 25 (SMTP)  
③ 443 (HTTPS)  
④ 8080 (HTTP-Alt)  
⑤ 3306 (MySQL)

**정답:** ④

**해설:**  
**Well-Known Ports**는 0~1023 범위의 IANA 공식 지정 포트입니다.

- **22 (SSH)**: ✅ Well-Known
- **25 (SMTP)**: ✅ Well-Known
- **443 (HTTPS)**: ✅ Well-Known
- **8080 (HTTP-Alt)**: ❌ Registered Port (1024~49151)
- **3306 (MySQL)**: Well-Known으로 분류되기도 하지만, 공식적으로는 IANA Registered

8080은 HTTP의 "대체(Alternative)" 포트로 주로 개발 환경이나 애플리케이션 서버에서 사용됩니다.

#### 주관식 (각 15점, 총 45점)

**6. PM이 신규 이커머스 프로젝트의 네트워크 아키텍처를 설계 중입니다. 3-Tier 아키텍처(Presentation, Application, Data)를 네트워크 관점에서 어떻게 구현할지 설명하고, 각 계층 간 방화벽 규칙을 제시하세요.**

**모범 답안:**

**3-Tier 아키텍처 네트워크 설계:**

**계층 구조:**

```
┌─────────────────────────────────────────┐
│      Tier 1: Presentation Layer         │
│           (DMZ - 외부 공개)              │
│                                          │
│   - 웹 서버 (Nginx, Apache)             │
│   - Load Balancer                        │
│   - CDN Origin                           │
│   - Subnet: 172.16.1.0/24 (DMZ)         │
└─────────────────────────────────────────┘
                    │
            [Firewall 1]
                    │
┌─────────────────────────────────────────┐
│      Tier 2: Application Layer           │
│          (Private - 애플리케이션)         │
│                                          │
│   - API 서버 (Node.js, Java)            │
│   - 비즈니스 로직 서버                   │
│   - 캐시 서버 (Redis)                    │
│   - Subnet: 192.168.10.0/24 (App)       │
└─────────────────────────────────────────┘
                    │
            [Firewall 2]
                    │
┌─────────────────────────────────────────┐
│         Tier 3: Data Layer               │
│          (Private - 데이터)              │
│                                          │
│   - 데이터베이스 (PostgreSQL, MySQL)     │
│   - 파일 스토리지                        │
│   - 백업 서버                            │
│   - Subnet: 192.168.20.0/24 (Data)      │
└─────────────────────────────────────────┘
```

**각 계층 역할:**

**Tier 1 (Presentation - DMZ):**
```
역할:
- 사용자 요청 최초 수신
- 정적 콘텐츠 서빙 (HTML, CSS, JS, 이미지)
- SSL 종료 (HTTPS → HTTP)
- 로드 밸런싱

서버:
- 웹 서버: Nginx × 2 (고가용성)
- Load Balancer: ALB 또는 HAProxy

특징:
- 외부(인터넷)에서 접근 가능
- 비즈니스 로직 없음 (보안)
- 침해 시 피해 최소화
```

**Tier 2 (Application - Private):**
```
역할:
- 비즈니스 로직 처리
- API 제공 (RESTful, GraphQL)
- 인증/인가
- 세션 관리

서버:
- API 서버: Node.js/Spring Boot × 3
- 캐시: Redis × 2 (Master-Slave)
- 메시지 큐: RabbitMQ

특징:
- 외부 직접 접근 불가 (보안)
- 웹 서버를 통해서만 접근
- Stateless (수평 확장 가능)
```

**Tier 3 (Data - Private):**
```
역할:
- 데이터 저장 및 관리
- 트랜잭션 처리
- 백업

서버:
- DB: PostgreSQL Primary + Replica
- 파일: NFS 또는 Object Storage (S3)
- 백업: 별도 백업 서버

특징:
- 가장 보안이 중요한 계층
- Application 계층에서만 접근
- 정기 백업 (Daily Incremental, Weekly Full)
```

---

**방화벽 규칙:**

**Firewall 1 (인터넷 ↔ DMZ ↔ Application):**

**인터넷 → DMZ (Inbound):**
```
Rule #  Source      Dest (DMZ)       Protocol  Port   Action  Description
1       0.0.0.0/0   172.16.1.10-11   TCP       80     ALLOW   HTTP
2       0.0.0.0/0   172.16.1.10-11   TCP       443    ALLOW   HTTPS
3       관리자IP     172.16.1.0/24    TCP       22     ALLOW   SSH (관리용, IP 제한)
4       0.0.0.0/0   172.16.1.0/24    ANY       ANY    DENY    기본 차단
```

**DMZ → 인터넷 (Outbound):**
```
Rule #  Source (DMZ)     Dest         Protocol  Port   Action  Description
1       172.16.1.0/24    0.0.0.0/0    TCP       80     ALLOW   패치/업데이트 (HTTP)
2       172.16.1.0/24    0.0.0.0/0    TCP       443    ALLOW   패치/업데이트 (HTTPS)
3       172.16.1.0/24    0.0.0.0/0    UDP       53     ALLOW   DNS 조회
4       172.16.1.0/24    0.0.0.0/0    ANY       ANY    DENY    나머지 차단
```

**DMZ ↔ Application:**
```
Rule #  Source (DMZ)     Dest (App)          Protocol  Port   Action  Description
1       172.16.1.10-11   192.168.10.10-12    TCP       8080   ALLOW   웹 → API
2       172.16.1.10-11   192.168.10.20       TCP       6379   ALLOW   웹 → Redis (세션)
3       172.16.1.0/24    192.168.10.0/24     ANY       ANY    DENY    나머지 차단
```

**Firewall 2 (Application ↔ Data):**

**Application → Data:**
```
Rule #  Source (App)      Dest (Data)         Protocol  Port   Action  Description
1       192.168.10.10-12  192.168.20.10       TCP       5432   ALLOW   API → PostgreSQL
2       192.168.10.10-12  192.168.20.11       TCP       5432   ALLOW   API → PG Replica (Read)
3       192.168.10.10-12  192.168.20.20       TCP       2049   ALLOW   API → NFS (파일)
4       192.168.10.0/24   192.168.20.30       TCP       ANY    DENY    백업 서버 직접 접근 차단
5       192.168.10.0/24   192.168.20.0/24     ANY       ANY    DENY    나머지 차단
```

**Data → Application (응답):**
```
Rule #  Source (Data)     Dest (App)          Protocol  Port   Action  Description
1       192.168.20.0/24   192.168.10.0/24     TCP       ANY    ALLOW   상태 기반 응답 (Stateful)
```

**관리 접근 (Bastion Host를 통한):**
```
Rule #  Source             Dest                Protocol  Port   Action  Description
1       192.168.99.10      172.16.1.0/24       TCP       22     ALLOW   Bastion → DMZ SSH
2       192.168.99.10      192.168.10.0/24     TCP       22     ALLOW   Bastion → App SSH
3       192.168.99.10      192.168.20.0/24     TCP       22     ALLOW   Bastion → Data SSH
4       192.168.99.10      192.168.20.10       TCP       5432   ALLOW   Bastion → DB (관리)
```

---

**보안 원칙:**

**1) 최소 권한 (Least Privilege):**
- 각 계층은 필요한 포트/프로토콜만 허용
- 예: 웹 서버는 DB에 직접 접근 불가

**2) 방어 심층화 (Defense in Depth):**
- 여러 계층의 방화벽
- 한 계층 침해 시 다른 계층 보호

**3) Fail-Safe Defaults:**
- 기본 정책: Deny All
- 명시적으로 허용된 것만 통과

**4) 세그먼트 격리 (Network Segmentation):**
- 각 계층을 별도 서브넷으로 분리
- VLAN 사용 가능

**5) 모니터링:**
```
- 모든 방화벽 로그를 SIEM으로 전송
- 차단된 트래픽 분석 (공격 시도 식별)
- 정기적인 규칙 검토 (불필요한 규칙 제거)
```

---

**실제 트래픽 흐름 예시:**

**사용자 요청:**
```
1. 사용자 (인터넷)
   → HTTPS 요청
2. [Firewall 1] 규칙 1 확인
   → 172.16.1.10 (웹 서버)로 허용
3. 웹 서버
   → 정적 파일인가? → 직접 응답
   → API 호출 필요? → 다음 단계
4. [Firewall 1] 규칙 1 확인
   → 192.168.10.10 (API 서버)로 허용
5. API 서버
   → 비즈니스 로직 처리
   → DB 조회 필요
6. [Firewall 2] 규칙 1 확인
   → 192.168.20.10 (DB 서버)로 허용
7. DB 서버
   → 쿼리 실행, 결과 반환
8. API 서버
   → 응답 생성
9. 웹 서버
   → 사용자에게 응답
```

**침해 시나리오:**
```
공격자가 웹 서버 (DMZ) 침투
→ [Firewall 1]이 API 서버 외 접근 차단
→ API 서버 침투해도 [Firewall 2]가 DB 외 접근 차단
→ 피해 최소화
```

---

**PM 체크리스트:**

- [ ] 각 계층이 명확히 분리되어 있는가?
- [ ] 방화벽 규칙이 최소 권한 원칙을 따르는가?
- [ ] 기본 정책이 Deny All인가?
- [ ] 관리 접근이 Bastion Host를 통하는가?
- [ ] 방화벽 로그가 수집 및 모니터링되는가?
- [ ] 정기적인 보안 감사 계획이 있는가?
- [ ] 침해 시 격리 및 복구 계획이 수립되어 있는가?

**비용 vs 보안:**
- 방화벽 추가 비용: 약 1,000만 원
- 보안 사고 비용: 수억~수십억 원
- **ROI: 충분히 가치 있음**

---

### 6교시 요약

**핵심 개념:**
1. **네트워크 장비**: Hub (구식), Switch (MAC 기반), Router (IP 기반, 경로 결정)
2. **방화벽**: 트래픽 제어 (패킷 필터링, Stateful Inspection, Application Layer)
3. **IDS/IPS**: 침입 탐지/방지 (IDS는 알림, IPS는 차단)
4. **DMZ**: 외부 공개 서버 격리, 내부 네트워크 보호

**PM 관점:**
- 네트워크 장비는 보안과 성능에 직접 영향
- 방화벽 정책은 명확하고 최소 권한 원칙 준수
- IPS는 단계적 배포 (Detection → Prevention)
- DMZ는 필수 (외부 공개 서버)
- 보안은 비용이 아닌 투자

---

**Day 13 완료!**

오늘 배운 내용:
- 1교시: 네트워크 기본 개념 (LAN/WAN, 토폴로지, 장비, 성능 지표)
- 2교시: OSI 7계층 모델 (계층별 역할, 캡슐화, 문제 진단)
- 3교시: TCP/IP 프로토콜 (TCP vs UDP, IP 주소, 포트, 3-way handshake)
- 4교시: DNS, HTTP, REST API (도메인, HTTP 메서드/상태코드, RESTful 설계)
- 5교시: 네트워크 장비 및 인프라 (허브/스위치/라우터/LB/VPN, 장비 선정, 설계)
- 6교시: 네트워크 보안 (방화벽, IDS/IPS, DMZ, 보안 아키텍처)

PM은 네트워크의 기본 동작 원리를 이해하고, 장비 선정부터 보안 아키텍처까지 기술팀과 효과적으로 소통하여 안정적이고 보안성 높은 인프라를 설계해야 합니다!
