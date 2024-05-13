export default function Hi() {
  const navigate = useNavigate()
  const params = useParams()

  return (
    <div>
      <div class="i-carbon-pedestrian text-4xl inline-block" />
      <p>
        Hi,
        {' '}
        {params.name}
      </p>
      <p class="text-sm op50">
        <em>Dynamic route!</em>
      </p>

      <div>
        <mdui-button
          variant="outlined"
          class="m-3 text-sm mt-8"
          onClick={() => navigate(-1)}
        >
          Back
        </mdui-button>
      </div>
    </div>
  )
}
