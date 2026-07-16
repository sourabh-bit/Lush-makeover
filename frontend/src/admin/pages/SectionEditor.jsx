import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { getPage, getSection } from '../schema';
import { useCmsDoc } from '../hooks/useCmsDoc';
import FieldRenderer from '../fields/FieldRenderer';
import ImageField from '../fields/ImageField';
import ImagesField from '../fields/ImagesField';
import RepeaterField from '../fields/RepeaterField';
import SaveBar from '../components/SaveBar';

// Full-screen editor for one section of the website.
const SectionEditor = () => {
  const { pageId, sectionKey } = useParams();
  const navigate = useNavigate();
  const page = getPage(pageId);
  const section = getSection(pageId, sectionKey);
  const { loading, error, draft, update, save, saving, dirty } = useCmsDoc(sectionKey);

  if (!page || !section) return <Navigate to="/admin/website" replace />;

  const goBack = () => {
    if (dirty && !window.confirm('You have unsaved changes. Leave without saving?')) return;
    navigate(`/admin/website/${page.id}`);
  };

  let body = null;
  if (loading) {
    body = (
      <div className="flex min-h-[40vh] items-center justify-center text-[#8b7f72]">
        <Loader2 size={22} className="animate-spin" />
      </div>
    );
  } else if (error) {
    body = <div className="rounded-2xl border border-black/5 bg-white p-6 text-[14px] text-[#8b7f72]">{error}</div>;
  } else if (section.kind === 'image') {
    body = <ImageField value={draft} onChange={update} label={section.label} />;
  } else if (section.kind === 'images') {
    body = <ImagesField value={draft} onChange={update} />;
  } else if (section.kind === 'text') {
    body = (
      <textarea
        value={draft ?? ''}
        rows={4}
        onChange={(event) => update(event.target.value)}
        className="w-full resize-none rounded-xl border border-black/10 bg-white px-3 py-3 text-[14px] leading-relaxed outline-none focus:border-black/30"
      />
    );
  } else if (section.kind === 'collection') {
    body = (
      <RepeaterField
        value={draft || []}
        onChange={update}
        fields={section.fields}
        itemNoun={section.itemNoun || 'Item'}
        titleField={section.titleField}
      />
    );
  } else {
    body = (
      <div className="space-y-5">
        {section.fields
          .filter((field) => field.type !== 'hidden')
          .map((field) => (
            <FieldRenderer
              key={field.key}
              field={field}
              value={draft?.[field.key]}
              onChange={(value) => update({ ...(draft || {}), [field.key]: value })}
            />
          ))}
      </div>
    );
  }

  return (
    <div className="pb-24">
      <button
        type="button"
        onClick={goBack}
        className="inline-flex min-h-[44px] items-center gap-1.5 text-[13px] text-[#8b7f72]"
      >
        <ArrowLeft size={16} />
        {page.label}
      </button>
      <h1 className="text-[24px] font-medium text-[#1f1f1f]">{section.label}</h1>
      {section.help && <p className="mt-1 text-[14px] text-[#8b7f72]">{section.help}</p>}

      <div className="mt-5">{body}</div>

      <SaveBar dirty={dirty} saving={saving} onSave={save} />
    </div>
  );
};

export default SectionEditor;
