"use client";
import { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy({
  lang,
  onClickAgree,
}: {
  lang: any;
  onClickAgree: Function;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <ChevronRight className="w-6 h-6 cursor-pointer text-text-secondary hover:text-accent-primary" />
      </DialogTrigger>

      <DialogContent className="max-w-[500px] gap-6 px-8">
        <h3 className="text-subhead_s">
          {lang.onboard.verify_email.accordion.privacy_policy}
        </h3>

        <div className="max-h-[calc(90vh-182px)] overflow-y-auto">
          <li className="text-body_s text-text-secondary mmt">
            프로젝트 팀 커리어젠(이하 '회사'라 함)는 개인정보보호법 등 회사가
            준수하여야 할 국내 개인정보 보호 법령을 준수하며, 관련 법령에 의거한
            개인정보처리방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다.
          </li>
          <li className="text-body_s text-text-secondary mmt">
            본 개인정보처리방침은 회사가 운영하는 커리어젠(Careerzen) 관련 제반
            서비스(이하 '커리어젠'라 함)에 적용되며 다음과 같은 내용을 담고
            있습니다.
          </li>
          <li className="text-body_s text-text-secondary mmt">
            이 개인정보처리방침에서 사용하는 용어의 의미는 관련 법령 및 회사의
            이용약관에서 정한 바에 따르며, 그 밖의 사항은 일반적인 상관례에
            따릅니다.
          </li>
          <p className="text-body_s text-text-secondary mmt">
            ※ 커리어젠 서비스는 만 14세 이상 가입 및 이용 가능한 서비스로 만
            14세 미만의 아동에 대해서는 회원 가입을 받지 않습니다.
          </p>
          <p className="text-body_s text-text-secondary mmt"></p>
          <h1 className="mb-4 text-title_l">
            1. 처리하는 개인정보의 항목 및 수집방법
          </h1>
          <h2 className="mb-2 text-title_s">1. 처리하는 개인정보의 항목</h2>
          <p className="text-body_s text-text-secondary mmt">
            ※ 회사는 커리어젠 서비스 이용을 위해 회원가입을 할 경우, 서비스
            제공에 필요한 개인정보를 수집합니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            1. 회원가입 시 ‘이메일, 비밀번호’가 필수항목으로 수집됩니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            2. 외부 서비스를 이용해 회원가입 시 외부 서비스에서 제공받는 ‘계정
            관련 정보 및 회원이 제공에 동의한 정보’가 필수항목으로 수집됩니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            3. 평가 등록/작성 시 ‘이름, 휴대폰 번호, 강점, 개선해야할 점, 작성자
            정보, 작성시간’ 등의 평가 정보가 필수항목으로 수집됩니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            4. 서비스 이용 중 회원이 직접 등록한 정보, 평판 요청/작성/열람 내역,
            내 프로젝트 테스트 질문 항목에 대한 답변, 테스트 결과 등이
            선택항목으로 수집됩니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            5. 고객소통팀을 통한 상담 및 문의 시에는 이름, 이메일, 전화번호 등의
            정보가 선택항목으로 수집됩니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            6. 서비스 이용 과정에서 OS버전, 단말기 정보 등의 환경정보와
            이용형태와 빈도 및 평판 요청/작성/열람 등 이용 과정에서 생성된
            정보가 수집됩니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            7. IP Address, 쿠키, 기기정보, 방문 일시, 서비스 이용 기록, 불량
            이용 기록 등이 생성되어 수집될 수 있습니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            8. 이벤트 및 경품 신청 과정에서 추가로 개인정보 수집이 발생할 수
            있습니다. 추가로 개인정보를 수집할 경우 해당 개인정보 시점에
            회원에게 ‘수집하는 개인정보 항목, 개인정보의 수집 및 이용목적,
            개인정보의 보유 및 이용기간’에 대해 안내 드리고 동의를 받습니다.
          </p>
          <p className="text-body_s text-text-secondary mmt"></p>
          <p className="text-body_s text-text-secondary mmt">
            2. 개인정보의 수집방법
          </p>
          <p className="text-body_s text-text-secondary mmt">
            * 회사는 다음과 같은 방법으로 개인정보를 수집합니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            1. 회원가입 및 서비스 이용 과정에서 회원이 개인정보 수집에 대해
            동의한 정보와 직접 정보를 입력하는 경우, 해당 개인정보를 수집합니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            2. 회원의 선택에 따라 네이버, 구글, 페이스북 등의 외부 서비스 등의
            아이디를 이용하여 로그인하는 경우, 회원에게 동의 받은 후 외부
            서비스로부터 제공받아 수집합니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            3. 고객소통팀을 통한 상담 과정에서 이름, 이메일, 전화번호 등을 통해
            회원의 개인정보가 수집될 수 있습니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            4. 기기정보 등과 같은 생성정보는 PC 웹, 모바일 웹/앱 이용 과정에서
            자동으로 생성되어 수집될 수 있습니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            5. 회사와 제휴한 외부 기업이나 단체로부터 개인정보를 제공받을 수
            있으며, 이러한 경우 정보통신망법 혹은 개인정보보호법에 따라 제휴한
            외부 기업 또는 단체에서 회원의 개인정보 제공 동의 등을 받은 후
            회사에 제공합니다.
          </p>
          <p className="text-body_s text-text-secondary mmt"> </p>
          <h2 className="mb-2 text-title_s">2. 개인정보의 처리 목적</h2>
          <p className="text-body_s text-text-secondary mmt">
            * 회사는 커리어젠 서비스(PC웹, 모바일 앱/웹 포함)의 회원 관리,
            서비스 제공과 개발 및 개선을 비롯하여 다음의 목적으로 개인정보를
            이용합니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            1. 서비스 이용에 따른 가입의사 확인, 회원 식별, 원활한 의사소통
            경로의 확보, 새로운 정보의 소개 및 고지사항 전달, 서비스 방문 및
            이용기록 분석 등
          </p>
          <p className="text-body_s text-text-secondary mmt">
            2. 회원이 경력 및 평판 정보를 등록, 열람/조회 및 관리할 수 있는
            서비스 제공
          </p>
          <p className="text-body_s text-text-secondary mmt">
            3. 회원이 등록한 경력 및 평판 정보 혹은 회원 정보에 기반한 경력 관리
            서비스 제공
          </p>
          <p className="text-body_s text-text-secondary mmt">
            4. 회원이 등록한 경력 및 평판 정보에 기반한 회원 간 성향 및 관심사
            분석을 통한 관계 형성 및 교류를 위한 맞춤형 서비스 제공
          </p>
          <p className="text-body_s text-text-secondary mmt">
            5. 회원이 등록한 프로필에 기반한 맞춤형 기업 정보 제공 서비스를 위해
            이용합니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            6. 커리어젠 서비스 제공과 신규 서비스 발굴 및 기존 서비스 개선 등
          </p>
          <p className="text-body_s text-text-secondary mmt">
            7. 유료 서비스 제공에 따른 구매 및 요금 결제, 상품 및 서비스 배송 등
          </p>
          <p className="text-body_s text-text-secondary mmt">
            8. 서비스 이용과 접속 빈도 분석, 서비스 이용에 대한 통계, 서비스
            분석 및 통계에 따른 맞춤 서비스 제공 및 광고 게재 등
          </p>
          <p className="text-body_s text-text-secondary mmt">
            9. 커리어젠 서비스 제공(광고 포함)에 더하여, 인구통계학적 분석,
            맞춤형 서비스 제공 등 신규 서비스 요소의 발굴 및 기존 서비스 개선 등
          </p>
          <p className="text-body_s text-text-secondary mmt">
            10. 법령 및 커리어젠 이용약관을 위반하는 회원에 대한 이용 제한 조치,
            부정 이용 행위를 포함하여 서비스의 원활한 운영에 지장을 주는 행위에
            대한 방지 및 제재, 계정도용 방지, 약관 개정 등의 고지사항 전달,
            -분쟁조정을 위한 기록 보존, 고객 문의 처리 등 회원 보호 및 서비스
            운영
          </p>
          <p className="text-body_s text-text-secondary mmt">
            11. 이벤트 정보 및 참여기회 제공과 경품 배송, 광고성 정보 제공 등
            마케팅 및 프로모션
          </p>
          <p className="text-body_s text-text-secondary mmt"> </p>
          <h2 className="mb-2 text-title_s">
            3. 개인정보의 제공 및 처리위탁 및 국외이전
          </h2>
          <p className="text-body_s text-text-secondary mmt">
            1. 개인정보의 제3자 제공회사는 회원의 사전 동의 없이 개인정보를
            제3자 혹은 외부에 제공하지 않습니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            - 단, 관련 법령에 의거해 개인정보를 제공할 의무가 발생하거나 제공이
            허용되는 경우, 또는 수사 목적으로 법률에 정해진 절차와 방법에 따라
            수사기관의 요구가 있는 경우에 회사는 회원의 사전 동의 없이도
            개인정보를 제3자에게 제공할 수 있습니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            - 회원의 사전 동의에 의한 개인정보의 제3자 제공 관련 사항은 다음과
            같습니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            - 제공받는 업체: 본인의 평판을 요청한 특정 기업 또는 고용주
          </p>
          <p className="text-body_s text-text-secondary mmt">
            - 제공되는 개인정보: 이름, 이메일, 평가정보
          </p>
          <p className="text-body_s text-text-secondary mmt">
            - 제공 목적: 회원의 과거 평판 확인
          </p>
          <p className="text-body_s text-text-secondary mmt">
            - 보유 및 이용기간: 제공일로부터 10일
          </p>
          <p className="text-body_s text-text-secondary mmt"> </p>
          <p className="text-body_s text-text-secondary mmt">
            2. 개인정보의 처리 위탁
          </p>
          <p className="text-body_s text-text-secondary mmt">
            1. 회사는 서비스 향상 등을 위하여 아래와 같이 개인정보의 처리를
            위탁하고 있으며, 위탁 받은 업체가 개인정보보호법 등 관계 법령에 따라
            개인정보를 안전하게 처리하도록 필요한 사항을 규정하고 관리와 감독을
            실시하고 있습니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">수탁업체: Supabase</p>
          <p className="text-body_s text-text-secondary mmt">
            위탁업무내용: 서비스 제공 및 분석을 위한 인프라 관리
          </p>
          <p className="text-body_s text-text-secondary mmt">
            개인정보의 보유 및 이용기간: 회원 탈퇴 시 또는 위탁 계약 종료시까지
          </p>
          <p className="text-body_s text-text-secondary mmt">수탁업체: Wepin</p>
          <p className="text-body_s text-text-secondary mmt">
            위탁업무내용: 본인 인증 관리
          </p>
          <p className="text-body_s text-text-secondary mmt">
            개인정보의 보유 및 이용기간: 회원 탈퇴 시 또는 위탁 계약 종료시까지
          </p>
          <p className="text-body_s text-text-secondary mmt"> </p>
          <h2 className="mb-2 text-title_s">4. 개인정보의 보유 및 이용기간</h2>
          <p className="text-body_s text-text-secondary mmt">
            - 회사는 원칙적으로 회원의 개인정보를 회원 탈퇴 시 지체없이 파기하고
            있습니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            - 단, 회원에게 개인정보 보관기간에 대해 별도의 동의를 얻은 경우,
            또는 법령에서 일정 기간 정보보관 의무를 부과하는 경우에는 해당 기간
            동안 개인정보를 안전하게 보관합니다.
          </p>
          <p className="text-body_s text-text-secondary mmt"> </p>
          <p className="text-body_s text-text-secondary mmt">
            1. 내부 방침에 의한 보관
          </p>
          <p className="text-body_s text-text-secondary mmt">
            - 탈퇴회원의 재가입 제한을 위한 회원정보 기록은 3개월간 보관됩니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            - 부정이용기록은 부정 이용 방지를 위해 5년간 보관됩니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            2. 관련 법령에 의한 보관
          </p>
          <p className="text-body_s text-text-secondary mmt">
            - 계약 또는 청약철회 등에 관한 기록 보유 : 5년 (전자상거래 등에서의
            소비자보호에 관한 법률)
          </p>
          <p className="text-body_s text-text-secondary mmt">
            - 대금결제 및 재화 등의 공급에 관한 기록 보유 : 5년 (전자상거래
            등에서의 소비자보호에 관한 법률)
          </p>
          <p className="text-body_s text-text-secondary mmt">
            - 소비자 불만 또는 분쟁처리에 관한 기록 보유 : 3년 (전자상거래
            등에서의 소비자보호에 관한 법률)
          </p>
          <p className="text-body_s text-text-secondary mmt">
            - 방문에 관한 기록 보유 : 3개월 (통신비밀보호법)
          </p>
          <p className="text-body_s text-text-secondary mmt"> </p>
          <h2 className="mb-2 text-title_s">5. 개인정보 파기</h2>
          <p className="text-body_s text-text-secondary mmt">
            - 개인정보 파기 시에는 재생이 불가능한 방법으로 파기하고 있습니다.
            또한 법령에서 보존의무를 부과한 정보에 대해서도 해당 기간 경과 후
            지체없이 재생이 불가능한 방법으로 파기합니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            - 전자적 파일 형태의 경우 복구 및 재생이 되지 않도록 기술적인 방법을
            이용하여 안전하게 삭제하며, 출력물 등은 분쇄하거나 소각하는 방식
            등으로 파기합니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            - 회사는 ‘개인정보 유효기간제’에 따라 1년간 서비스를 이용하지 않은
            회원의 개인정보를 별도로 분리 보관하여 관리하고 있습니다.
          </p>
          <p className="text-body_s text-text-secondary mmt"> </p>
          <h2 className="mb-2 text-title_s">6. 이용자의 권리</h2>
          <p className="text-body_s text-text-secondary mmt">
            1. 회원은 언제든지 커리어젠 웹 사이트 로그인 후, 내 계정 메뉴 선택
            후 자신의 개인정보를 조회하거나 수정할 수 있습니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            2. 회원은 언제든지 ‘커리어젠 탈퇴’ 등을 통해 개인정보의 수집 및 이용
            동의를 철회하고 삭제를 요구할 수 있습니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            3. 회원이 개인정보의 오류에 대한 정정을 요청한 경우, 정정을 완료하기
            전까지 해당 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된
            개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게
            지체없이 통지하여 정정이 이루어지도록 하겠습니다. 다만, 법률에
            특별한 규정이 있거나 법령상 의무를 준수하기 위하여 불가피한 경우,
            그리고 개인정보를 처리하지 않으면 회원과 약정한 서비스를 제공하지
            못하는 등 계약의 이행이 곤란함에도 불구하고 회원이 커리어젠 탈퇴 등
            계약의 해지 의사를 명확하게 밝히지 않은 경우에는 회원의 개인정보
            처리를 계속할 수 있습니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            4. 회원은 자신의 개인정보에 대한 열람을 회사에 요구할 수 있습니다.
          </p>
          <p className="text-body_s text-text-secondary mmt"> </p>
          <h2 className="mb-2 text-title_s">7. 쿠키의 운영</h2>
          <p className="text-body_s text-text-secondary mmt">
            - 쿠키란? 커리어젠 사이트 접속시 회원의 저장장치에 전송하는 특별한
            텍스트 파일(text file)을 말합니다. 쿠키는 웹사이트의
            서버(server)에서만 읽어 들일 수 있는 형태로 전송되며 개인이 사용하는
            브라우저(browser)의 디렉터리(directory) 하위에 저장됩니다. 모바일
            애플리케이션과 같이 쿠키 기술을 사용할 수 없는 경우에는 쿠키와
            유사한 기능을 수행하는 기술(광고식별자 등)을 사용할 수도 있습니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">1. 쿠키의 사용 목적</p>
          <p className="text-body_s text-text-secondary mmt">
            - 커리어젠이 쿠키를 통해 수집하는 정보는 '수집하는 개인정보의
            항목'과 같으며 '개인정보의 수집 및 이용목적' 외의 용도로는 이용되지
            않습니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">2. 쿠키 설정 거부</p>
          <p className="text-body_s text-text-secondary mmt">
            - 이용자는 쿠키에 대한 선택권을 가지고 있습니다. 웹 브라우저
            옵션(option)을 선택함으로써 모든 쿠키의 허용, 동의를 통한 쿠키의
            허용, 모든 쿠키의 차단을 스스로 결정할 수 있습니다. 단, 쿠키 저장을
            거부할 경우에는 로그인이 필요한 일부 서비스를 이용하지 못할 수도
            있습니다.
          </p>
          <p className="text-body_s text-text-secondary mmt"></p>
          <p className="text-body_s text-text-secondary mmt"></p>
          <h2 className="mb-2 text-title_s">8. 회원의 권리와 의무</h2>
          <p className="text-body_s text-text-secondary mmt"> </p>
          <p className="text-body_s text-text-secondary mmt">
            - 회원은 개인정보를 보호받을 권리와 함께 스스로를 보호하고 타인의
            정보를 침해하지 않을 의무도 가지고 있습니다. 비밀번호를 포함한
            회원의 개인정보가 유출되지 않도록 조심하시고 게시물을 포함한 타인의
            개인정보를 훼손하지 않도록 유의해 주십시오.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            - 회원이 입력한 부정확한 정보로 인해 발생하는 사고의 책임은 회원
            자신에게 있습니다. 회원은 개인정보를 최신의 상태로 정확하게 입력하여
            불의의 사고를 예방하여야 할 의무가 있습니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            - 회원이 위 책임을 다하지 못하고 타인의 정보 및 존엄성을 훼손할
            시에는 『정보통신망 이용촉진 및 정보보호 등에 관한 법률』 등 관련
            법률에 의해 처벌받을 수 있습니다.
          </p>
          <p className="text-body_s text-text-secondary mmt"></p>
          <p className="text-body_s text-text-secondary mmt"></p>
          <h2 className="mb-2 text-title_s">
            9. 개인정보의 기술적·관리적 보호대책
          </h2>
          <p className="text-body_s text-text-secondary mmt"> </p>
          <p className="text-body_s text-text-secondary mmt">
            - 회사는 회원의 개인정보를 처리함에 있어 개인정보가 분실, 도난,
            유출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은
            기술적/관리적 대책을 강구하고 있습니다.
          </p>
          <p className="text-body_s text-text-secondary mmt"> </p>
          <p className="text-body_s text-text-secondary mmt">
            1. 해킹 등에 대비한 대책
          </p>
          <p className="text-body_s text-text-secondary mmt">
            - 회사는 해킹이나 컴퓨터 바이러스 등에 의해 회원의 개인정보가
            유출되거나 훼손되는 것을 막기 위해 최선을 다하고 있습니다. 회원의
            개인정보나 자료가 유출되거나 손상되지 않도록 방지하고 있으며, 암호화
            통신 등을 통하여 네트워크상에서 개인정보를 안전하게 전송할 수 있도록
            하고 있습니다. 그리고 침입차단시스템을 이용하여 외부로부터의 무단
            접근을 통제하고 있습니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            2. 개인정보취급자의 최소화 및 교육
          </p>
          <p className="text-body_s text-text-secondary mmt">
            회사의 개인정보취급자는 해당 업무를 직접적으로 수행하는 담당자에
            한정시키고 있으며 이를 위한 별도의 비밀번호를 부여하여 정기적으로
            갱신하고 있으며, 담당자에 대한 수시 교육을 통하여 회사의
            개인정보보호 정책 및 개인정보처리방침 등 관련 규정의 준수를 항상
            강조하고 있습니다.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            3. 개인 아이디와 비밀번호 관리
          </p>
          <p className="text-body_s text-text-secondary mmt">
            - 회사는 회원의 개인정보를 보호하기 위하여 최선의 노력을 다하고
            있습니다. 단, 회원 본인의 부주의나 회사의 고의 또는 중대한 과실이
            아닌 사유로 개인정보가 유출되어 발생한 문제와 기본적인 인터넷의
            위험성 때문에 일어나는 일들에 대해 회사는 일체의 책임을 지지
            않습니다.
          </p>
          <p className="text-body_s text-text-secondary mmt"> </p>
          <h2 className="mb-2 text-title_s">
            10. 개인정보 보호책임자 및 담당자의 연락처
          </h2>
          <p className="text-body_s text-text-secondary mmt"></p>
          <p className="text-body_s text-text-secondary mmt">
            1. 회사의 서비스를 이용하며 발생하는 모든 개인정보 관련 민원을
            담당부서로 신고할 수 있습니다. 회사는 회원의 신고사항에 대하여
            신속하게 답변을 드릴 것입니다.
          </p>
          <p className="text-body_s text-text-secondary mmt"> </p>
          <li className="text-body_s text-text-secondary mmt">이름 : 윤창진</li>
          <li className="text-body_s text-text-secondary mmt">직위 : CEO</li>
          <li className="text-body_s text-text-secondary mmt">
            이메일 : robin582@careerzen.org
          </li>
          <li className="text-body_s text-text-secondary mmt">
            연락처 : 010-8628-1735
          </li>
          <p className="text-body_s text-text-secondary mmt"> </p>
          <p className="text-body_s text-text-secondary mmt">
            기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에
            문의하시기 바랍니다.
          </p>
          <p className="text-body_s text-text-secondary mmt"> </p>
          <li className="text-body_s text-text-secondary mmt">
            개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)
          </li>
          <li className="text-body_s text-text-secondary mmt">
            대검찰청 사이버수사과 (www.spo.go.kr / 국번없이 1301)
          </li>
          <li className="text-body_s text-text-secondary mmt">
            경찰청 사이버안전지킴이 (www.police.go.kr/www/security/cyber.jsp /
            국번없이 182)
          </li>
          <p className="text-body_s text-text-secondary mmt"> </p>
          <h2 className="mb-2 text-title_s">11. 기타</h2>
          <p className="text-body_s text-text-secondary mmt">
            커리어젠 내에 링크되어 있는 웹사이트 등 타 서비스들이 개인정보를
            수집하는 행위에 대해서는 본 커리어젠 개인정보처리방침이 적용되지
            않음을 알려드립니다.
          </p>
          <p className="text-body_s text-text-secondary mmt"> </p>
          <h2 className="mb-2 text-title_s">12. 고지의 의무</h2>
          <p className="text-body_s text-text-secondary mmt">
            현 개인정보처리방침 내용 추가, 삭제 및 수정이 있을 시에는 시행일
            최소 7일전부터 커리어젠 웹사이트(https://www.careerzen.org) 또는
            서비스 내 '공지사항'을 통해 공지할 것입니다. 다만, 이용자 권리의
            중대한 변경이 발생할 때에는 최소 30일 전에 공지하도록 하며 필요 시
            이용자의 동의를 다시 받을 수도 있습니다.
          </p>
          <p className="text-body_s text-text-secondary mmt"></p>
          <p className="text-body_s text-text-secondary mmt">
            공고일자 : 2024. 02. 16.
          </p>
          <p className="text-body_s text-text-secondary mmt">
            시행일자 : 2024. 03. 01.
          </p>
        </div>

        <div className="flex gap-2">
          <DialogClose className="max-w-[212px] w-full">
            <Button size="lg" variant="secondary">
              {lang.onboard.verify_email.accordion.back}
            </Button>
          </DialogClose>

          <DialogClose className="max-w-[212px] w-full">
            <Button size="lg" onClick={() => onClickAgree()}>
              {lang.onboard.verify_email.accordion.agree}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
