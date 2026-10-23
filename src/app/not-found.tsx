import { LinkButton } from "@/components/ui/button";
import { StatusMessage } from "@/components/ui/status-message";

export default function NotFound() {
  return (
    <StatusMessage title="404" message="페이지를 찾을 수 없습니다.">
      <LinkButton href="/">메인 페이지로 이동</LinkButton>
    </StatusMessage>
  );
}
