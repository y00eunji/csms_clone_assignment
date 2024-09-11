import Input from '@/shared/ui/input/Input.tsx';

export default function LoginInput() {
  return <Input onChange={e => console.log(e)} placeholder="ID" />;
}
