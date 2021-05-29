export const GetRandomButtonColor = () => {
  const colors = ['blurple', 'gray', 'green'];

  return colors[Math.floor(Math.random() * colors.length)];
};
export const ExtractInfoFromButton = (b: any) => {
  const spl = b.id.split('_');
  return {
    id: spl[0],
    message_id: spl[1],
    action: spl[2],
  };
};
