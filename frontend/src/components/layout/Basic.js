export default function Basic(props) {
  const { image, description } = props;

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          padding: "12px 0",
        }}
      >
        <img
          src={image}
          alt="Placeholder image."
          layout="responsive"
          width={375}
          height={208}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "24px",
          fontWeight: "500",
          paddingBottom: "12px",
        }}
      >
        Description of the activitie
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          fontSize: "16px",
          fontWeight: "500",
          paddingTop: "12px",
        }}
      >
        {description}
      </div>
    </>
  );
}
