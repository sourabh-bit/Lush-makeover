import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { getPage, summarizeSection, sectionThumbnail } from '../schema';
import defaults from '../../content/defaults.json';

// Lists the editable sections of one website page, each with a small
// preview of its current content.
const PageSections = () => {
  const { pageId } = useParams();
  const page = getPage(pageId);
  const [payloads, setPayloads] = useState(defaults);

  useEffect(() => {
    apiFetch('/api/cms/documents')
      .then((documents) => {
        const byKey = { ...defaults };
        for (const doc of documents) byKey[doc.key] = doc.payload;
        setPayloads(byKey);
      })
      .catch(() => {});
  }, []);

  if (!page) return <Navigate to="/admin/website" replace />;

  return (
    <div>
      <Link to="/admin/website" className="inline-flex min-h-[44px] items-center gap-1.5 text-[13px] text-[#8b7f72]">
        <ArrowLeft size={16} />
        All pages
      </Link>
      <h1 className="text-[24px] font-medium text-[#1f1f1f]">{page.label}</h1>
      <p className="mt-1 text-[14px] text-[#8b7f72]">Pick the part you want to change.</p>

      <div className="mt-5 space-y-2.5">
        {page.sections.map((section) => {
          const payload = payloads[section.key];
          const summary = summarizeSection(section, payload);
          const thumbnail = sectionThumbnail(section, payload);
          return (
            <Link
              key={section.key}
              to={`/admin/website/${page.id}/${section.key}`}
              className="flex min-h-[72px] items-center gap-4 rounded-2xl border border-black/5 bg-white px-4 py-3 shadow-[0_10px_30px_-24px_rgba(0,0,0,0.35)] transition-transform active:scale-[0.99]"
            >
              {thumbnail ? (
                <img src={thumbnail} alt="" className="h-12 w-12 shrink-0 rounded-xl object-cover" />
              ) : (
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f4efe8] text-[15px] text-[#8b7f72]">
                  Aa
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-medium text-[#1f1f1f]">{section.label}</span>
                <span className="mt-0.5 block truncate text-[13px] text-[#8b7f72]">{summary || section.help}</span>
              </span>
              <ChevronRight size={18} className="shrink-0 text-[#c9c2b8]" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PageSections;
