export const Footer = () => {
  return (
    <footer className="mt-16 pt-8 border-t text-center">
      <p className="text-slate-600 italic">
        Made with ❤️ by the Roar Bangla community
      </p>
      <p className="text-muted-foreground mt-4">
        &copy; {new Date().getFullYear()} Roar Bangla. All rights reserved.
      </p>
    </footer>
  );
};
