export default function ({ redirect }: { redirect: (path: string) => void }) {
  if (localStorage.getItem('authenticated') !== 'true') {
    return redirect('/login');
  }
}