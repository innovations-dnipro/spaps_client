export const appendPhIcons = () => {
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/@phosphor-icons/web';

  document.head.appendChild(script);
};
